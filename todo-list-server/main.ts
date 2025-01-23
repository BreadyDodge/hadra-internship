import { Context, Hono } from "hono";

const app = new Hono();

interface Todo {
  id: string;
  title: string;
  description: string;
  status: "done" | "todo" | "inprogress";
}

let todos: Todo[] = [
  {
    id: "1",
    title: "Learn Deno",
    description: "Learn how to use Deno",
    status: "done",
  },
  {
    id: "2",
    title: "Learn TypeScript",
    description: "Learn how to use TypeScript",
    status: "done",
  },
  {
    id: "3",
    title: "Learn Hono",
    description: "Learn how to use Hono",
    status: "inprogress",
  },
  {
    id: "4",
    title: "Learn React",
    description: "Learn how to use React",
    status: "todo",
  },
];

app.get("/todos", (c: Context) => {
  return c.json({ data: todos });
});

// GET /todos/completed
// GET /todos/1
// GET /todos/2
app.get("/todos/completed", (c: Context) => {
  // implement this
  // get all todos that have status "done"
  const completed = todos.filter((todo) => todo.status === "done");
  return c.json({ data: completed });
});

app.get("/todos/inprogress", (c: Context) => {
  // implement this
  // get all todos that have status "inprogress"
  const inprogress = todos.filter((todo) => todo.status === "inprogress");
  return c.json({ data: inprogress });
});

app.patch("/todos/:id/complete", (c: Context) => {
  // change the status of a todo with that ID to "done"
  const id = c.req.param("id");
  const requested = todos.find((todo) => todo.id === id);
  if (requested === undefined) {
    c.status(404);
    return c.json({ message: "todo with that id does not exist" });
  }
  requested.status = "done";
  return c.json({ message: "status changed to done" });
});

app.patch("/todos/:id/start", (c: Context) => {
  // change the status of a todo with that ID to "inprogress"
  const id = c.req.param("id");
  const requested = todos.find((todo) => todo.id === id);
  if (requested === undefined) {
    c.status(404);
    return c.json({ message: "todo with that id does not exist" });
  }
  requested.status = "inprogress";
  return c.json({ message: "status changed to inprogress" });
});

app.delete("/todos/:id", (c: Context) => {
  // delete a todo with that ID
  //best practice: make a copy with filter -> update the array
  const id = c.req.param("id");
  const requested = todos.find((todo) => todo.id === id);
  if (requested === undefined) {
    c.status(404);
    return c.json({ message: "todo with that id does not exist" });
  }
  todos = todos.filter((todo) => todo.id !== id);
  return c.json({ message: "task deleted successfully" });
}); //it returns 404 not found but it works

//also error 500
app.put("/todos/:id", async (c: Context) => {
  // update a todo with that ID
  // the request body should contain the new title and description
  const id = c.req.param("id");
  const requested = todos.find((todo) => todo.id === id);
  if (requested === undefined) {
    c.status(404);
    return c.json({ message: "todo with that id does not exist" });
  }
  const body = await c.req.json();
  if (body == undefined) {
    c.status(400);
    return c.json({ message: "please fill the body" });
  }
  const title = body.title as string;
  const description = body.description as string;
  requested.title = title;
  requested.description = description;
  return c.json({ message: "task information updated" });
});

app.get("/todos/:id", (c: Context) => {
  const id = c.req.param("id");
  const requested = todos.find((todo) => todo.id === id);
  if (requested === undefined) {
    c.status(404);
    return c.json({ message: "todo with that id does not exist" });
  }
  return c.json({ data: requested });
});

//doesn't work for some reason error 500
app.post("/todos", async (c: Context) => {
  const body = await c.req.json();
  const id = body.id as string;
  const title = body.title as string;
  const description = body.description as string;
  const status = "todo";

  if (todos.some((todo) => todo.id === id)) {
    c.status(400);
    return c.json({ message: "id already exists" });
  }

  todos.push({ id, title, description, status }); // this usually pushes to a DB (mysql, postgresql, mongo, etc)
  c.status(201); // 201 means "created"
  return c.json({ message: "created" });
});

app.get("/l/googz", (c: Context) => {
  return c.redirect("https://google.com");
});

Deno.serve(app.fetch);

import { Context, Hono } from "hono";

const app = new Hono();

interface Todo {
  id: string;
  title: string;
  description: string;
  status: "done" | "todo" | "inprogress";
}

const todos: Todo[] = [];

app.get("/todos", (c: Context) => {
  return c.json({ data: todos });
});

app.post("/todos/create", async (c: Context) => {
  const body = await c.req.json();
  const id = body.id as string;
  const title = body.title as string;
  const description = body.description as string;
  const status = "todo";

  if (todos.some((todo) => todo.id === id)) {
    c.status(400);
    return c.json({ message: "id already exists" });
  }

  const todo: Todo = {
    id,
    title,
    description,
    status,
  };
  todos.push(todo); // this usually pushes to a DB (mysql, postgresql, mongo, etc)
  c.status(201); // 201 means "created"
  return c.json({ message: "created" });
});

app.get("/l/googz", (c: Context) => {
  return c.redirect("https://google.com");
});

Deno.serve(app.fetch);

import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { Database } from "jsr:@db/sqlite@0.12";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

const db = new Database("test.db");
const app = new Hono();
app.use(cors());

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: "done" | "todo" | "inprogress";
}

db.prepare(
  `
	CREATE TABLE IF NOT EXISTS todo (
	  id TEXT PRIMARY KEY,
	  title TEXT NOT NULL,
	  description TEXT,
    status TEXT CHECK(status in('done', 'todo', 'inprogress')),
    created_at DATETIME CURRENT_TIMESTAMP 
	);
  `,
).run();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/todos", (c: Context) => {
  const todos: Todo[] = db.prepare("SELECT * from todo").all();
  return c.json({ data: todos });
});

// GET /todos/completed
// GET /todos/1
// GET /todos/2
app.get("/todos/completed", (c: Context) => {
  // implement this
  // get all todos that have status "done"
  try {
    const todos: Todo[] = db
      .prepare("SELECT * from todo where status = 'done'")
      .all();
    return c.json({ data: todos });
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({ message: "my bad bro" });
  }
});

app.get("/todos/inprogress", (c: Context) => {
  // implement this
  // get all todos that have status "inprogress"
  try {
    const todos: Todo[] = db
      .prepare("SELECT * from todo where status = 'inprogress'")
      .all();
    return c.json({ data: todos });
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({ message: "my bad bro" });
  }
});

app.patch("/todos/:id/complete", (c: Context) => {
  // change the status of a todo with that ID to "done"
  const id = c.req.param("id");
  try {
    const todo = db.prepare("SELECT id from todo where id = ?").get(id);
    if (todo == undefined) {
      c.status(404);
      return c.json({ message: "todo with that id does not exist" });
    }
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({
      message: "something went wrong trying to delete your todo",
    });
  }
  try {
    db.prepare("UPDATE todo SET status = 'done' WHERE id = ?").run(id);
  } catch (err) {
    c.status(500);
    console.error(err);
    c.json({ message: "bomboclat" });
  }
  return c.json({ message: "status changed to done" });
});

app.patch("/todos/:id/start", (c: Context) => {
  // change the status of a todo with that ID to "inprogress"
  const id = c.req.param("id");
  try {
    db.prepare("UPDATE todo SET status = 'inprogress' WHERE id = ?").run(id);
  } catch (err) {
    c.status(500);
    console.error(err);
    c.json({ message: "bomboclat" });
  }
  return c.json({ message: "status changed to inprogress" });
});

app.delete("/todos/:id", (c: Context) => {
  // delete a todo with that ID
  // best practice: make a copy with filter -> update the array
  const id = c.req.param("id");

  try {
    const todo = db.prepare("SELECT id from todo where id = ?").get(id);
    if (todo == undefined) {
      c.status(404);
      return c.json({ message: "todo with that id does not exist" });
    }
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({
      message: "something went wrong trying to delete your todo",
    });
  }

  try {
    db.prepare("DELETE from todo WHERE id = ?").run(id);
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({
      message: "something went wrong trying to delete your todo",
    });
  }
  return c.json({ message: "task deleted successfully" });
});

app.put("/todos/:id", async (c: Context) => {
  // update a todo with that ID
  // the request body should contain the new title and description
  const id = c.req.param("id");
  try {
    console.log("SELECT statment run");
    const todo = db.prepare("SELECT id from todo where id = ?").get(id);
    if (todo == undefined) {
      console.log("not found");
      c.status(404);
      return c.json({ message: "todo with that id does not exist" });
    }
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({
      message: "something went wrong trying to update your todo",
    });
  }

  try {
    const body = await c.req.json();
    const title = body.title as string;
    const description = body.description as string;
    db.prepare("UPDATE todo SET title = ?, description = ? WHERE id = ?").all(
      title,
      description,
      id,
    );
    return c.json({ message: "updated successfully" });
  } catch (err) {
    c.status(500);
    console.error(err);
    c.json({ message: "something went wrong" });
  }
});

app.get("/todos/:id", (c: Context) => {
  const id = c.req.param("id");
  try {
    const todo = db.prepare("SELECT * FROM todo WHERE id = ?").get(id); //use 'get' to get either value or undefine; can be used for error checking
    if (todo === undefined) {
      c.status(404);
      return c.json({ message: "todo with that id does not exist" });
    }
    return c.json({ data: todo });
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({ message: "something went wrong" });
  }
});

//doesn't work for some reason error 500
app.post("/todos", async (c: Context) => {
  try {
    const body = await c.req.json();
    const title = body.title as string;
    const description = body.description as string;
    await sleep(1000);
    db.prepare(
      "INSERT INTO todo(id,title,description,status,created_at) VALUES(?,?,?,?,?)",
    ).run(nanoid(10), title, description, "todo", new Date().toISOString());
    return c.json({ message: "updated successfully" });
  } catch (err) {
    c.status(500);
    console.error(err);
    return c.json({ message: "something went wrong" });
  }
});

app.get("/l/googz", (c: Context) => {
  return c.redirect("https://google.com");
});

Deno.serve(app.fetch);

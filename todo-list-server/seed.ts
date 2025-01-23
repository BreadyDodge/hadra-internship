import { Database } from "jsr:@db/sqlite@0.12";

const db = new Database("test.db");

const todos = [
  {
    id: "1",
    title: "Learn Deno",
    description: "Study the Deno runtime and its features.",
    status: "inprogress",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build a Todo App",
    description: "Create a simple todo application using Deno.",
    status: "todo",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Explore Deno Deploy",
    description: "Deploy a Deno application to the cloud.",
    status: "todo",
    created_at: new Date().toISOString(),
  },
];

for (const todo of todos) {
  db.prepare(
    `INSERT INTO todo (id, title, description, status, created_at) 
       VALUES (?, ?, ?, ?, ?);`,
  ).run(todo.id, todo.title, todo.description, todo.status, todo.created_at);
}

console.log("Database seeded with initial todos.");

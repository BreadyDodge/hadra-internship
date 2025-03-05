import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { taskTable } from "~/server/db/schema";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
  done: 0 | 1;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //getting tasks
  if (req.method === "GET") {
    try {
      const tasks = await db.select().from(taskTable);
      return res.status(200).json({ data: tasks });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Failed to get todos. Erro: ${String(err)}` });
    }
  }
  //adding tasks
  if (req.method === "POST") {
    const { title } = req.body as { title: string };
    try {
      const createdTask = (await db
        .insert(taskTable)
        .values({ id: nanoid(10), title })
        .returning()) as Task[];
      return res.status(201).json({ data: createdTask[0] });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Failed to load tasks. Err ${String(err)}` });
    }
  }
}

import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { taskTable } from "~/server/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PATCH") {
    const id = req.query.id as string;
    try {
      const task = await db.query.taskTable.findFirst({
        where: eq(taskTable.id, id),
      });
      if (!task) {
        return res.status(404).json({ message: "No such task" });
      }
      await db.update(taskTable).set({ done: 1 }).where(eq(taskTable.id, id));
      return res
        .status(200)
        .json({ message: `Successfully completed task with id: ${id}` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: `Failed to complete task with id: ${id}. Err: ${String(err)}`,
      });
    }
  }
}

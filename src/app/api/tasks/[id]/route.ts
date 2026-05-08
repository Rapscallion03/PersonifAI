import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE a task and its sub-steps (cascade is handled by Prisma)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Delete Task Error:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

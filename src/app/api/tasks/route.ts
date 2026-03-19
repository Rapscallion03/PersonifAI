import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all tasks with their sub-steps
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        subSteps: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error("Fetch Tasks Error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST a new task with sub-steps
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, juice, subSteps } = body;

    const newTask = await prisma.task.create({
      data: {
        title,
        juice: juice || {},
        subSteps: {
          create: subSteps.map((step: any) => ({
            type: step.type,
            title: step.title,
            content: step.content,
            isCompleted: step.isCompleted || false,
          })),
        },
      },
      include: {
        subSteps: true,
      },
    });

    return NextResponse.json(newTask);
  } catch (error: any) {
    console.error("Create Task Error:", error);
    return NextResponse.json({ error: "Failed to create task: " + error.message }, { status: 500 });
  }
}

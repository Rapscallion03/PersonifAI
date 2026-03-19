import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH to update completion status of a substep
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isCompleted } = await req.json();
    const { id } = await params;

    const updatedSubStep = await prisma.subStep.update({
      where: { id },
      data: { isCompleted },
    });

    return NextResponse.json(updatedSubStep);
  } catch (error: any) {
    console.error("Update Substep Error:", error);
    return NextResponse.json({ error: "Failed to update substep" }, { status: 500 });
  }
}

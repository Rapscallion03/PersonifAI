import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH to update completion status of a substep
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

// DELETE a substep
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.subStep.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Substep deleted successfully" });
  } catch (error: any) {
    console.error("Delete Substep Error:", error);
    return NextResponse.json({ error: "Failed to delete substep" }, { status: 500 });
  }
}

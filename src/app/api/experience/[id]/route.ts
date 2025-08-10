import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const { company, position, duration, jobdesk, durationend } = body
    const updated = await prisma.experience.update({
      where: { id },
      data: {
        company,
        position,
        duration,
        jobdesk,
        durationend
      }
    })
    return NextResponse.json(updated, { status: 200 })
  } catch (error) {

    return NextResponse.json({ error: "Failed to update experience " }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    await prisma.experience.delete({
      where: { id }
    })
    return NextResponse.json({ message: "Experience deleted succesfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
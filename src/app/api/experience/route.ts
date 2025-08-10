import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { duration: "desc" }
    })
    return NextResponse.json(experience, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Filed to get experience" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { company, position, duration, jobdesk, durationend } = body;
    const newExperience = await prisma.experience.create({
      data: {
        company,
        position,
        duration,
        jobdesk,
        durationend
      }
    })
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }

}
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData()
  const title = formData.get("title") as string;
  const description = formData.get("description") as string
  const file = formData.get("image") as File

  if (!title || !description || !file) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from("projectimages").upload(filename, buffer, { contentType: file.type, })
  if (error) {
    return NextResponse.json({ error: "Upload image supabase failed" }, { status: 500 })
  }
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projectimages/${data.path}`;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      imageUrl
    }
  })
  return NextResponse.json(project, { status: 201 })
}

export async function GET() {
  const project = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(project, { status: 200 })
}
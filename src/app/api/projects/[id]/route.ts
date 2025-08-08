import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const project = await prisma.project.findUnique({
      where: { id },
    })
    if (!project) {
      return NextResponse.json({ message: "Failed to get project" }, { status: 404 })
    }
    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Project Not Found" }, { status: 404 })
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const formData = await req.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File

    let imageUrl: string | null = null

    if (image && image.size > 0) {
      const filename = `${Date.now()}- ${image.name}`
      const { data, error } = await supabase.storage.from("projectimages").upload(filename, image, {
        cacheControl: "3600",
        upsert: false
      })
      if (error) {
        return NextResponse.json({ message: "Upload image to supabase failed" }, { status: 500 })
      }
      const url = supabase.storage.from("projectimages").getPublicUrl(data.path)
      imageUrl = url.data.publicUrl
    }
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        ...(imageUrl && { imageUrl })
      }
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error({ message: "failed to update project", error }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
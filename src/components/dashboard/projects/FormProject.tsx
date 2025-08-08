"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Tipe Project
export type Project = {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
};

type FormProjectProps = {
  project?: Project;
  onSuccess?: () => void;
  setOpen?: (open: boolean) => void;
};

export default function FormProject({ project, onSuccess, setOpen }: FormProjectProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!title || !description || (!image && !project)) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        project?.id ? `/api/projects/${project.id}` : "/api/projects",
        {
          method: project?.id ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal menyimpan project.");
      }

      toast.success(project?.id ? "Project berhasil diperbarui!" : "Project berhasil disimpan!");
      onSuccess?.();
      setOpen?.(false);
    } catch (error) {
      toast.error(`Gagal menyimpan`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div>
        <Label htmlFor="title">Judul Project</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul"
        />
      </div>
      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Masukkan deskripsi"
        />
      </div>
      <div>
        <Label htmlFor="image">Gambar {project ? "(opsional)" : ""}</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(file);
          }}
        />
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : project ? "Perbarui" : "Simpan"}
      </Button>
    </div>
  );
}

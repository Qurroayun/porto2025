"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import FormProject, { Project } from "@/components/dashboard/projects/FormProject";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error("Gagal mengambil data project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Project</h2>

        {/* Tambah Project */}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>+ Tambah Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Project</DialogTitle>
              <DialogDescription>Isi data project baru kamu di bawah ini.</DialogDescription>
            </DialogHeader>
            <FormProject onSuccess={fetchProjects} setOpen={setOpenCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                </TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Edit */}
                  <Dialog
                    open={openEditId === project.id}
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        setOpenEditId(project.id || null);
                      } else {
                        setOpenEditId(null);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                          Perbarui informasi project kamu.
                        </DialogDescription>
                      </DialogHeader>
                      <FormProject
                        project={project}
                        onSuccess={() => {
                          fetchProjects();
                          setOpenEditId(null);
                        }}
                        setOpen={(open) => {
                          if (!open) setOpenEditId(null);
                        }}
                      />
                    </DialogContent>
                  </Dialog>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus project ini?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/projects/${project.id}`, {
                                method: "DELETE",
                              });
                              if (!res.ok) throw new Error("Gagal hapus project");

                              setProjects((prev) =>
                                prev.filter((p) => p.id !== project.id)
                              );
                              toast.success("Project berhasil dihapus!");
                            } catch (err) {
                              toast.error("Gagal menghapus project");
                            }
                          }}
                        >
                          Lanjutkan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Pastikan file ini ada di path berikut
import FormExperience from "@/components/dashboard/experience/FormExperience";

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string; // atau Date tergantung API-mu
  jobdesk: string;
}

export default function ExperienceDashboardPage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperience(data);
    } catch {
      toast.error("Gagal mengambil data pengalaman");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Pengalaman Kerja</h2>

        {/* Tambah Experience */}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>+ Tambah Pengalaman</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pengalaman</DialogTitle>
              <DialogDescription>
                Isi detail pengalaman kerja kamu.
              </DialogDescription>
            </DialogHeader>
            <FormExperience
              onSuccess={fetchExperience}
              setOpen={(open: boolean) => setOpenCreate(open)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Perusahaan</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Jobdesk</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experience.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.company}</TableCell>
                <TableCell>{exp.position}</TableCell>
                <TableCell>
                  {new Date(exp.duration).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                </TableCell>
                <TableCell className="max-w-sm truncate">
                  {exp.jobdesk}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Edit */}
                  <Dialog
                    open={openEditId === exp.id}
                    onOpenChange={(isOpen: boolean) => {
                      if (isOpen) setOpenEditId(exp.id);
                      else setOpenEditId(null);
                    }}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Pengalaman</DialogTitle>
                        <DialogDescription>Update data kamu.</DialogDescription>
                      </DialogHeader>
                      <FormExperience
                        experience={exp}
                        onSuccess={() => {
                          fetchExperience();
                          setOpenEditId(null);
                        }}
                        setOpen={(open: boolean) => {
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
                          Yakin ingin menghapus pengalaman ini?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              const res = await fetch(
                                `/api/experience/${exp.id}`,
                                {
                                  method: "DELETE",
                                }
                              );
                              if (!res.ok) throw new Error("Gagal hapus");

                              setExperience((prev) =>
                                prev.filter((e) => e.id !== exp.id)
                              );
                              toast.success("Berhasil dihapus!");
                            } catch (err) {
                              toast.error("Gagal menghapus");
                            }
                          }}>
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

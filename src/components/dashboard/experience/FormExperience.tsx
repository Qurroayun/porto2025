"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Tipe Experience
export type Experience = {
  id?: string;
  company: string;
  position: string;
  duration: string; // ISO string format, karena DateTime di Prisma
  jobdesk: string;
};

type FormExperienceProps = {
  experience?: Experience;
  onSuccess?: () => void;
  setOpen?: (open: boolean) => void;
};

export default function FormExperience({
  experience,
  onSuccess,
  setOpen,
}: FormExperienceProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (experience) {
      setCompany(experience.company);
      setPosition(experience.position);
      setDuration(experience.duration?.slice(0, 10)); // for date input (yyyy-mm-dd)
      setJobdesk(experience.jobdesk);
    }
  }, [experience]);

  const handleSubmit = async () => {
    if (!company || !position || !duration || !jobdesk) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(
        experience?.id ? `/api/experience/${experience.id}` : "/api/experience",
        {
          method: experience?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            position,
            duration: new Date(duration).toISOString(),
            jobdesk,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal menyimpan pengalaman kerja.");
      }

      toast.success(
        experience?.id
          ? "Pengalaman berhasil diperbarui!"
          : "Pengalaman berhasil ditambahkan!"
      );
      onSuccess?.();
      setOpen?.(false);
    } catch (error) {
      toast.error("Gagal menyimpan pengalaman");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div>
        <Label htmlFor="company">Perusahaan</Label>
        <Input
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nama perusahaan"
        />
      </div>
      <div>
        <Label htmlFor="position">Posisi</Label>
        <Input
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Posisi di perusahaan"
        />
      </div>
      <div>
        <Label htmlFor="duration">Tanggal Mulai</Label>
        <Input
          id="duration"
          type="date"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="jobdesk">Jobdesk</Label>
        <Textarea
          id="jobdesk"
          value={jobdesk}
          onChange={(e) => setJobdesk(e.target.value)}
          placeholder="Deskripsikan pekerjaanmu"
        />
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : experience ? "Perbarui" : "Simpan"}
      </Button>
    </div>
  );
}

'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type MediaUploadProps = {
  label: string;
  id: string;
  // name: string;
  accept?: string;
  required?: boolean;
  error?: string;
  onUpload?: (url: string) => void;
};

export default function MediaUpload({
  label,
  id,
  // name,
  accept,
  required = false,
  error,
  onUpload,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setUploading(false);
      console.error("Upload failed");
      return;
    }

    const data = await res.json();

    const uploadedUrl = data;
    // Call back with uploaded URL
    onUpload?.(data);

    // For preview
    if (file.type.startsWith("image/")) {
      setPreviewUrl(uploadedUrl);
    }

    setUploading(false);
    setProgress(100);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        // name={name}
        type="file"
        accept={accept}
        required={required}
        disabled={uploading}
        onChange={handleChange}
        className={error ? "border-red-500" : ""}
      />

      {uploading && (
        <div>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
        </div>
      )}

      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="max-h-40 rounded border"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
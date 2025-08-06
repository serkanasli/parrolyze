"use client";

import { useImagePreview } from "@/hooks/use-image-preview";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageUploadProps {
  onChange: (value: File | undefined) => void;
  onBlur: () => void;
  name?: string;
  value?: File;
  invalid?: boolean;
}

function ImageUpload({ onChange, onBlur, name, value, invalid, ...rest }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useImagePreview(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const renderImagePreview = () => {
    if (!preview) {
      return <Upload size={32} className="text-muted-foreground" />;
    }

    return (
      <>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={handleRemove}
          className="absolute -top-2.5 -right-2.5 z-10 hidden h-5 w-5 rounded-full p-1 text-white group-hover:flex"
        >
          <X size={12} />
        </Button>
        <Image
          src={preview}
          width={200}
          height={200}
          alt="preview"
          className="h-16 w-16 rounded-xl object-cover md:h-24 md:w-24"
        />
      </>
    );
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "bg-background hover:bg-secondary group relative w-full cursor-pointer rounded-md border border-dashed p-5 shadow-none transition-colors duration-300",
          invalid && "border-destructive",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-y-1">
          <div className="relative z-0 flex h-16 w-16 items-center justify-center rounded-xl border md:h-24 md:w-24">
            {renderImagePreview()}
          </div>
          <p className="text-muted-foreground text-sm font-semibold">
            {value ? value.name : "Click to upload"}
          </p>
          <span className="text-muted-foreground mt-1.5 text-center text-xs">
            PNG, JPG, max 1MB, 1024×1024 px recommended
          </span>
        </div>
      </div>
      <Input
        {...rest}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        ref={inputRef}
        type="file"
        multiple={false}
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
      />
    </div>
  );
}

export default ImageUpload;

import { createClient } from "../supabase/server";

export interface UploadOptions {
  bucket: string;
  folder?: string;
  fileName?: string;
  upsert?: boolean;
}

export async function uploadFile(
  file: File,
  options: UploadOptions,
): Promise<{ url: string; path: string }> {
  const supabase = await createClient();

  // Generate unique filename if not provided
  const fileName = options.fileName || `${Date.now()}-${file.name}`;
  const filePath = options.folder ? `${options.folder}/${fileName}` : fileName;

  const { data, error } = await supabase.storage.from(options.bucket).upload(filePath, file, {
    upsert: options.upsert || false,
  });

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = await supabase.storage.from(options.bucket).getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
}

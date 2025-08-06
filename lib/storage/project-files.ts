import { deleteFile, uploadFile, UploadOptions } from "./upload";

const PROJECT_BUCKET = "files";

export async function uploadProjectIcon(
  file: File,
  projectId: string,
  userId: string,
): Promise<{ url: string; path: string }> {
  const options: UploadOptions = {
    bucket: PROJECT_BUCKET,
    folder: `${userId}/${projectId}/icons`,
    fileName: `icon-${Date.now()}.${file.name.split(".").pop()}`,
    upsert: true,
  };

  return uploadFile(file, options);
}

export async function uploadProjectAsset(
  file: File,
  projectId: string,
  assetType: "image" | "document" | "video",
): Promise<{ url: string; path: string }> {
  const options: UploadOptions = {
    bucket: PROJECT_BUCKET,
    folder: `projects/${projectId}/${assetType}s`,
    fileName: `${assetType}-${Date.now()}-${file.name}`,
    upsert: false,
  };

  return uploadFile(file, options);
}

export async function deleteProjectFile(filePath: string): Promise<void> {
  return deleteFile(PROJECT_BUCKET, filePath);
}

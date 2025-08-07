export async function urlToFile(url: string): Promise<File | ""> {
  if (!url) return "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Fetch failed with status: ${response.status}`);
      return "";
    }

    const blob = await response.blob();
    const mimeType = blob.type || "application/octet-stream";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1] || "file";

    return new File([blob], fileName, { type: mimeType });
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return "";
  }
}

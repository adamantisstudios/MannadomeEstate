import { supabase } from "./supabaseClient"

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export async function uploadPropertyImage(file: File, propertyId: string): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${propertyId}/${Date.now()}.${fileExt}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from("property-images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw error
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("property-images").getPublicUrl(fileName)

    return {
      url: publicUrl,
      path: fileName,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      url: "",
      path: "",
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}

export async function deletePropertyImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from("property-images").remove([path])

    return !error
  } catch (error) {
    console.error("Delete error:", error)
    return false
  }
}

export async function uploadMultipleImages(files: File[], propertyId: string): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadPropertyImage(file, propertyId))

  return Promise.all(uploadPromises)
}

// Get optimized image URL with transformations
export function getOptimizedImageUrl(
  path: string,
  options: {
    width?: number
    height?: number
    quality?: number
  } = {},
): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from("property-images").getPublicUrl(path)

  // Add transformation parameters if needed
  const params = new URLSearchParams()
  if (options.width) params.append("width", options.width.toString())
  if (options.height) params.append("height", options.height.toString())
  if (options.quality) params.append("quality", options.quality.toString())

  return params.toString() ? `${publicUrl}?${params}` : publicUrl
}

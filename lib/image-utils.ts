// Image optimization utilities for efficient loading and storage

export interface ImageOptimizationOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: "webp" | "jpeg" | "png"
}

export const DEFAULT_IMAGE_OPTIONS: ImageOptimizationOptions = {
  maxWidth: 1200,
  maxHeight: 800,
  quality: 0.8,
  format: "webp",
}

export async function compressImage(
  file: File,
  options: ImageOptimizationOptions = DEFAULT_IMAGE_OPTIONS,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      const { width, height } = calculateDimensions(
        img.width,
        img.height,
        options.maxWidth || 1200,
        options.maxHeight || 800,
      )

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: `image/${options.format || "webp"}`,
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            reject(new Error("Failed to compress image"))
          }
        },
        `image/${options.format || "webp"}`,
        options.quality || 0.8,
      )
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  let { width, height } = { width: originalWidth, height: originalHeight }

  // Scale down if necessary
  if (width > maxWidth) {
    height = (height * maxWidth) / width
    width = maxWidth
  }

  if (height > maxHeight) {
    width = (width * maxHeight) / height
    height = maxHeight
  }

  return { width: Math.round(width), height: Math.round(height) }
}

export async function uploadToSupabase(file: File, path: string) {
  const { createClient } = await import("@supabase/supabase-js")

  const supabase = createClient(
    "https://hqsfouxmubvsoehopdxa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc2ZvdXhtdWJ2c29laG9wZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTQ0MDYsImV4cCI6MjA3MTk3MDQwNn0.9PXf_UmswKhVbVnyIdfZ7yrfVGBZE6Nim23h0DHLdpE",
  )

  const { data, error } = await supabase.storage.from("property-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) throw error

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("property-images").getPublicUrl(path)

  return publicUrl
}

export function getOptimizedImageUrl(url: string, options?: ImageOptimizationOptions): string {
  // If it's a Supabase storage URL, we can add transformation parameters
  if (url.includes("supabase.co/storage")) {
    const params = new URLSearchParams()
    if (options?.maxWidth) params.set("width", options.maxWidth.toString())
    if (options?.maxHeight) params.set("height", options.maxHeight.toString())
    if (options?.quality) params.set("quality", Math.round(options.quality * 100).toString())

    return params.toString() ? `${url}?${params.toString()}` : url
  }

  return url
}

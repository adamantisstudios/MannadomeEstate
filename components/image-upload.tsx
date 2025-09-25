"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void
  maxImages?: number
  existingImages?: string[]
}

export default function ImageUpload({ onImagesChange, maxImages = 5, existingImages = [] }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(existingImages)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return

    const remainingSlots = maxImages - images.length
    const filesToUpload = Array.from(files).slice(0, remainingSlots)

    setUploading(true)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        // Compress image if needed
        const compressedFile = await compressImage(file)

        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: "POST",
          body: compressedFile,
        })

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`)
        }

        const result = await response.json()
        return result.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      const newImages = [...images, ...uploadedUrls]

      setImages(newImages)
      onImagesChange(newImages)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Some images failed to upload. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const compressImage = (file: File, maxWidth = 1200): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob!], file.name, { type: "image/jpeg" }))
          },
          "image/jpeg",
          0.8,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onImagesChange(newImages)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        } ${images.length >= maxImages ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading || images.length >= maxImages}
        />

        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 4.5MB ({images.length}/{maxImages} images)
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`Property image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Main</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Upload, ImageIcon } from "lucide-react"
import { uploadMultipleImages, type UploadResult } from "@/lib/storage"
import Image from "next/image"

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void
  propertyId: string
  maxFiles?: number
  existingImages?: string[]
}

export function SupabaseImageUpload({
  onImagesUploaded,
  propertyId,
  maxFiles = 10,
  existingImages = [],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages)
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setUploading(true)
      setError("")
      setUploadProgress(0)

      try {
        // Validate file types and sizes
        const validFiles = acceptedFiles.filter((file) => {
          const isValidType = file.type.startsWith("image/")
          const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB
          return isValidType && isValidSize
        })

        if (validFiles.length !== acceptedFiles.length) {
          setError("Some files were skipped (invalid type or too large)")
        }

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90))
        }, 200)

        // Upload files
        const results: UploadResult[] = await uploadMultipleImages(validFiles, propertyId)

        clearInterval(progressInterval)
        setUploadProgress(100)

        // Check for upload errors
        const successfulUploads = results.filter((result) => !result.error)
        const failedUploads = results.filter((result) => result.error)

        if (failedUploads.length > 0) {
          setError(`${failedUploads.length} files failed to upload`)
        }

        // Update preview images
        const newImageUrls = successfulUploads.map((result) => result.url)
        const updatedImages = [...previewImages, ...newImageUrls]
        setPreviewImages(updatedImages)
        onImagesUploaded(updatedImages)
      } catch (error) {
        setError("Upload failed. Please try again.")
        console.error("Upload error:", error)
      } finally {
        setUploading(false)
        setTimeout(() => setUploadProgress(0), 1000)
      }
    },
    [propertyId, previewImages, onImagesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxFiles: maxFiles - previewImages.length,
    disabled: uploading,
  })

  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(updatedImages)
    onImagesUploaded(updatedImages)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-12 w-12 text-gray-400" />
          <div>
            {isDragActive ? (
              <p className="text-blue-600">Drop the images here...</p>
            ) : (
              <div>
                <p className="text-gray-600">Drag and drop images here, or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Supports: JPEG, PNG, WebP, GIF (max 50MB each)</p>
              </div>
            )}
          </div>
          <Button type="button" variant="outline" disabled={uploading}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Choose Images
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading images...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previewImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Images ({previewImages.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewImages.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Property image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

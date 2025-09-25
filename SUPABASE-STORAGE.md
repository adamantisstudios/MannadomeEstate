# Supabase Storage Setup Guide for Mannadome Estate

This comprehensive guide will help you set up Supabase Storage for handling image uploads in your Mannadome Estate website. Since you're already using Supabase for your database, this keeps everything in one ecosystem.

## Table of Contents
1. [Supabase Storage Setup](#supabase-storage-setup)
2. [Storage Policies Configuration](#storage-policies-configuration)
3. [Code Implementation](#code-implementation)
4. [Testing and Verification](#testing-and-verification)
5. [Troubleshooting](#troubleshooting)

## 1. Supabase Storage Setup

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your Mannadome Estate project
3. Navigate to **Storage** in the left sidebar

### Step 2: Create Storage Buckets
1. Click **"New bucket"**
2. Create the following buckets:

**Property Images Bucket:**
- **Bucket name:** `property-images`
- **Public bucket:** ✅ (checked)
- **File size limit:** 50MB
- **Allowed MIME types:** `image/jpeg,image/png,image/webp,image/gif`

**Profile Images Bucket (Optional):**
- **Bucket name:** `profile-images`
- **Public bucket:** ✅ (checked)
- **File size limit:** 10MB
- **Allowed MIME types:** `image/jpeg,image/png,image/webp`

### Step 3: Configure Bucket Settings
For each bucket:
1. Click on the bucket name
2. Go to **Settings** tab
3. Configure:
   - **File size limit:** 50MB for property-images, 10MB for profile-images
   - **Allowed MIME types:** Add image formats you want to support
   - **File transformation:** Enable if you want automatic image optimization

## 2. Storage Policies Configuration

### Step 1: Set Up RLS Policies
1. In Supabase Dashboard, go to **Storage** → **Policies**
2. Select your `property-images` bucket
3. Create the following policies:

**Policy 1: Public Read Access**
\`\`\`sql
-- Allow public read access to all images
CREATE POLICY "Public read access for property images" ON storage.objects
FOR SELECT USING (bucket_id = 'property-images');
\`\`\`

**Policy 2: Authenticated Upload**
\`\`\`sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload property images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'property-images' 
  AND auth.role() = 'authenticated'
);
\`\`\`

**Policy 3: Admin Delete/Update**
\`\`\`sql
-- Allow admin users to delete/update images
CREATE POLICY "Admin users can manage property images" ON storage.objects
FOR ALL USING (
  bucket_id = 'property-images' 
  AND auth.jwt() ->> 'email' = 'info.mannadomeestate@gmail.com'
);
\`\`\`

### Step 2: Enable RLS
1. Go to **Storage** → **Settings**
2. Ensure **Row Level Security (RLS)** is enabled for storage

## 3. Code Implementation

### Step 1: Update Environment Variables
Add to your Vercel project environment variables:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### Step 2: Install Required Dependencies
The Supabase client is already installed, but ensure you have the latest version:
\`\`\`bash
npm install @supabase/supabase-js@latest
\`\`\`

### Step 3: Create Storage Utility Functions
Create `lib/storage.ts`:
\`\`\`typescript
import { supabase } from './supabaseClient'

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export async function uploadPropertyImage(
  file: File,
  propertyId: string
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${propertyId}/${Date.now()}.${fileExt}`
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(fileName)

    return {
      url: publicUrl,
      path: fileName
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      url: '',
      path: '',
      error: error instan ceof Error ? error.message : 'Upload failed'
    }
  }
}

export async function deletePropertyImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('property-images')
      .remove([path])

    return !error
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

export async function uploadMultipleImages(
  files: File[],
  propertyId: string
): Promise<UploadResult[]> {
  const uploadPromises = files.map(file => 
    uploadPropertyImage(file, propertyId)
  )
  
  return Promise.all(uploadPromises)
}

// Get optimized image URL with transformations
export function getOptimizedImageUrl(
  path: string,
  options: {
    width?: number
    height?: number
    quality?: number
  } = {}
): string {
  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(path)

  // Add transformation parameters if needed
  const params = new URLSearchParams()
  if (options.width) params.append('width', options.width.toString())
  if (options.height) params.append('height', options.height.toString())
  if (options.quality) params.append('quality', options.quality.toString())

  return params.toString() ? `${publicUrl}?${params}` : publicUrl
}
\`\`\`

### Step 4: Create Image Upload Component
Create `components/supabase-image-upload.tsx`:
\`\`\`typescript
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { X, Upload, ImageIcon } from 'lucide-react'
import { uploadMultipleImages, UploadResult } from '@/lib/storage'
import Image from 'next/image'

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
  existingImages = []
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages)
  const [error, setError] = useState<string>('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    setError('')
    setUploadProgress(0)

    try {
      // Validate file types and sizes
      const validFiles = acceptedFiles.filter(file => {
        const isValidType = file.type.startsWith('image/')
        const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB
        return isValidType && isValidSize
      })

      if (validFiles.length !== acceptedFiles.length) {
        setError('Some files were skipped (invalid type or too large)')
      }

      // Upload files
      const results: UploadResult[] = await uploadMultipleImages(validFiles, propertyId)
      
      // Check for upload errors
      const successfulUploads = results.filter(result => !result.error)
      const failedUploads = results.filter(result => result.error)

      if (failedUploads.length > 0) {
        setError(`${failedUploads.length} files failed to upload`)
      }

      // Update preview images
      const newImageUrls = successfulUploads.map(result => result.url)
      const updatedImages = [...previewImages, ...newImageUrls]
      setPreviewImages(updatedImages)
      onImagesUploaded(updatedImages)

      setUploadProgress(100)
    } catch (error) {
      setError('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }, [propertyId, previewImages, onImagesUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: maxFiles - previewImages.length,
    disabled: uploading
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
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
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
                <p className="text-gray-600">
                  Drag and drop images here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports: JPEG, PNG, WebP, GIF (max 50MB each)
                </p>
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
\`\`\`

### Step 5: Update Property Creation Form
Update your property creation form to use Supabase Storage:

\`\`\`typescript
// In your property form component
import { SupabaseImageUpload } from '@/components/supabase-image-upload'

// Add to your form state
const [propertyImages, setPropertyImages] = useState<string[]>([])

// In your form JSX
<div className="space-y-2">
  <label className="text-sm font-medium">Property Images</label>
  <SupabaseImageUpload
    onImagesUploaded={setPropertyImages}
    propertyId={`temp-${Date.now()}`} // Use actual property ID after creation
    maxFiles={10}
  />
</div>

// When submitting the form, include the images
const formData = {
  // ... other form fields
  images: propertyImages
}
\`\`\`

### Step 6: Update Database Schema
Add an images column to your properties table if not already present:

\`\`\`sql
-- Add images column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Update existing properties with empty array if needed
UPDATE properties 
SET images = '{}' 
WHERE images IS NULL;
\`\`\`

## 4. Testing and Verification

### Step 1: Test Upload Functionality
1. Go to your property creation form
2. Try uploading different image formats (JPEG, PNG, WebP)
3. Test drag and drop functionality
4. Verify images appear in Supabase Storage dashboard

### Step 2: Test Image Display
1. Create a property with images
2. Verify images display correctly in property listings
3. Test image optimization and loading

### Step 3: Test Permissions
1. Test uploading as authenticated user
2. Verify public access to images
3. Test admin deletion capabilities

## 5. Troubleshooting

### Common Issues and Solutions

**Issue: "Row Level Security policy violation"**
- **Solution:** Check that your RLS policies are correctly configured
- Verify the user is authenticated when uploading
- Check bucket permissions in Supabase dashboard

**Issue: "File upload failed"**
- **Solution:** Check file size limits (max 50MB)
- Verify MIME type is allowed
- Check network connection and Supabase status

**Issue: "Images not displaying"**
- **Solution:** Verify bucket is set to public
- Check the public URL generation
- Ensure images were uploaded successfully

**Issue: "Slow upload speeds"**
- **Solution:** Implement image compression before upload
- Use WebP format for better compression
- Consider implementing progressive upload for large files

### Debug Steps
1. Check browser console for errors
2. Verify Supabase project settings
3. Test with smaller image files first
4. Check network tab for failed requests

### Performance Optimization
1. **Image Compression:** Compress images before upload
2. **Lazy Loading:** Use Next.js Image component with lazy loading
3. **CDN:** Supabase Storage includes CDN by default
4. **Caching:** Set appropriate cache headers

## 6. Advanced Features

### Image Transformations
Supabase Storage supports image transformations:
\`\`\`typescript
// Get resized image
const thumbnailUrl = getOptimizedImageUrl(imagePath, {
  width: 300,
  height: 200,
  quality: 80
})
\`\`\`

### Batch Operations
\`\`\`typescript
// Upload multiple images efficiently
const uploadResults = await Promise.all(
  files.map(file => uploadPropertyImage(file, propertyId))
)
\`\`\`

### Image Metadata
Store additional metadata with images:
\`\`\`typescript
const { data, error } = await supabase.storage
  .from('property-images')
  .upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
    metadata: {
      propertyId: propertyId,
      uploadedBy: userEmail,
      description: imageDescription
    }
  })
\`\`\`

## Conclusion

This setup provides a robust, scalable image storage solution integrated with your existing Supabase database. The system handles:
- Secure file uploads with authentication
- Public image access for property listings
- Image optimization and transformations
- Proper error handling and user feedback
- Admin management capabilities

Your Mannadome Estate website now has professional-grade image handling capabilities that will scale with your business growth.

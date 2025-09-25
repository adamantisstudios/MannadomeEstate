# Vercel Blob Storage Setup Guide for Mannadome Estate

This guide will walk you through setting up Vercel Blob storage for image uploads in your Mannadome Estate website, integrating it with your existing Supabase database.

## Overview

Vercel Blob provides secure, scalable file storage that integrates seamlessly with your Next.js application. We'll use it to store property images while keeping property metadata in your Supabase database.

## Step 1: Enable Vercel Blob Integration

### In v0 Interface:
1. Click the **gear icon** (⚙️) in the top right corner
2. Select **Project Settings**
3. Navigate to **Integrations** tab
4. Find **Vercel Blob** and click **Add Integration**
5. Follow the prompts to enable Blob storage for your project

### Alternative Method (if deploying to Vercel):
1. Go to your Vercel dashboard
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database** → **Blob**
5. Follow the setup wizard

## Step 2: Environment Variables

After enabling Blob integration, these environment variables will be automatically added:
\`\`\`
BLOB_READ_WRITE_TOKEN=your_blob_token_here
\`\`\`

**Important**: The Blob integration automatically provides the necessary environment variables. You don't need to manually add them.

## Step 3: Update Database Schema

Your Supabase `properties` table should already have an `images` column (JSON array). If not, run this SQL in your Supabase SQL editor:

\`\`\`sql
-- Add images column if it doesn't exist
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_properties_images ON properties USING GIN (images);
\`\`\`

## Step 4: Install Required Dependencies

The following packages should already be installed in your project:
- `@vercel/blob` - For blob operations
- `next` - Next.js framework

If you need to install them manually:
\`\`\`bash
npm install @vercel/blob
\`\`\`

## Step 5: Implementation Code

### Image Upload API Route

Create or update `app/api/upload/route.ts`:

\`\`\`typescript
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const file = request.body;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
\`\`\`

### Property Creation with Image Upload

Update your property creation form to handle multiple image uploads:

\`\`\`typescript
// In your property creation component
const handleImageUpload = async (files: FileList) => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return response.json();
  });
  
  return Promise.all(uploadPromises);
};
\`\`\`

## Step 6: Update Property API Routes

Modify `app/api/properties/route.ts` to handle image URLs:

\`\`\`typescript
// In your POST handler
const images = formData.getAll('images') as string[];
const propertyData = {
  // ... other fields
  images: images, // Store blob URLs in database
};
\`\`\`

## Step 7: Frontend Image Display

Update your property components to display blob images:

\`\`\`typescript
// In property display components
const PropertyImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="w-full h-48 object-cover rounded-lg"
      onError={(e) => {
        // Fallback to placeholder if image fails to load
        e.currentTarget.src = '/placeholder.svg?height=200&width=300';
      }}
    />
  );
};
\`\`\`

## Step 8: Testing the Setup

### 1. Test Image Upload
1. Go to `/admin/properties/new`
2. Fill out the property form
3. Upload 1-3 images using the file input
4. Submit the form
5. Check that the property appears with images in the property listings

### 2. Verify Database Storage
1. Open your Supabase dashboard
2. Go to Table Editor → `properties`
3. Find your newly created property
4. Check that the `images` column contains an array of blob URLs

### 3. Test Image Display
1. Visit the main properties page
2. Verify that property images load correctly
3. Check property detail pages
4. Ensure images are responsive and properly sized

## Step 9: Production Deployment

### Vercel Deployment:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy your application
4. Verify that Blob storage works in production

### Environment Variables Check:
- Ensure `BLOB_READ_WRITE_TOKEN` is set in production
- Verify Supabase environment variables are configured
- Test image uploads in production environment

## Troubleshooting

### Common Issues:

**1. "BLOB_READ_WRITE_TOKEN is not defined"**
- Solution: Ensure Blob integration is properly enabled in Vercel
- Check that environment variables are set correctly

**2. "Upload failed" errors**
- Solution: Check file size limits (Blob has a 4.5MB limit per file)
- Verify file types are supported (images: jpg, png, gif, webp)

**3. Images not displaying**
- Solution: Check that blob URLs are properly stored in database
- Verify image URLs are accessible (should start with `https://`)

**4. Database connection issues**
- Solution: Verify Supabase environment variables
- Check that RLS policies allow image URL storage

### File Size Optimization:

Add image compression before upload:

\`\`\`typescript
const compressImage = (file: File, maxWidth: number = 1200): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
      }, 'image/jpeg', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
\`\`\`

## Security Considerations

1. **File Type Validation**: Only allow image files
2. **File Size Limits**: Implement client and server-side size checks
3. **Access Control**: Use Supabase RLS policies to control who can upload
4. **Content Scanning**: Consider implementing virus/malware scanning

## Performance Tips

1. **Image Optimization**: Use Next.js Image component for automatic optimization
2. **Lazy Loading**: Implement lazy loading for property image galleries
3. **CDN**: Vercel Blob automatically provides CDN distribution
4. **Caching**: Set appropriate cache headers for images

## Monitoring and Analytics

1. **Usage Tracking**: Monitor blob storage usage in Vercel dashboard
2. **Error Logging**: Implement proper error logging for upload failures
3. **Performance Metrics**: Track upload times and success rates

## Next Steps

After successful setup:
1. Implement image gallery functionality for properties
2. Add image editing capabilities (crop, resize)
3. Implement bulk image upload for multiple properties
4. Add image metadata storage (alt text, captions)
5. Consider implementing image variants (thumbnails, different sizes)

## Support

If you encounter issues:
1. Check Vercel Blob documentation: https://vercel.com/docs/storage/vercel-blob
2. Review Supabase integration guides
3. Check the browser console for detailed error messages
4. Verify all environment variables are properly set

---

**Note**: This setup integrates Vercel Blob with your existing Supabase database, storing image URLs in Supabase while the actual files are stored in Vercel Blob for optimal performance and scalability.

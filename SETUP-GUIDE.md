# Mannadome Estate - Complete Setup Guide

## 🚀 Production Setup Instructions

### 1. Supabase Database Setup

#### Step 1: Run the Database Setup Script
1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to the **SQL Editor**
3. Copy and paste the entire content from `scripts/supabase-setup.sql`
4. Click **Run** to execute the script

This will create:
- All necessary tables (properties, inquiries, testimonials, admin_users)
- Row Level Security policies
- Storage bucket for images
- Sample data for testing
- Admin user with email: `info.mannadomeestate@gmail.com`

#### Step 2: Verify Setup
After running the script, verify in your Supabase dashboard:
- **Database > Tables**: Should show properties, inquiries, testimonials, admin_users
- **Storage**: Should show 'property-images' bucket
- **Authentication > Users**: Admin user should be created

### 2. Environment Variables Setup

Add these environment variables to your Vercel project or `.env.local`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://hqsfouxmubvsoehopdxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc2ZvdXhtdWJ2c29laG9wZHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTQ0MDYsImV4cCI6MjA3MTk3MDQwNn0.9PXf_UmswKhVbVnyIdfZ7yrfVGBZE6Nim23h0DHLdpE
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxc2ZvdXhtdWJ2c29laG9wZHhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjM5NDQwNiwiZXhwIjoyMDcxOTcwNDA2fQ.yA8a-0LJ1qXyejQDRUAg7jsYYWVyyc31A6WMWBM7n7s
\`\`\`

### 3. Admin Authentication Setup

#### Creating the Admin User in Supabase Auth

1. **Go to Supabase Dashboard > Authentication > Users**
2. **Click "Add User"**
3. **Fill in the details:**
   - Email: `info.mannadomeestate@gmail.com`
   - Password: Create a secure password (save this!)
   - Email Confirm: ✅ (check this box)
   - Auto Confirm User: ✅ (check this box)

4. **Click "Create User"**

#### Admin Login Process

1. **Access Admin Panel**: Navigate to `/admin/login`
2. **Login Credentials**:
   - Email: `info.mannadomeestate@gmail.com`
   - Password: [The password you set in Supabase]

3. **First Login**: After successful login, you'll be redirected to `/admin/dashboard`

### 4. Admin Dashboard Features

Once logged in, admins can:

#### Property Management
- **View All Properties**: `/admin/properties`
- **Add New Property**: `/admin/properties/new`
- **Edit Property**: `/admin/properties/[id]/edit`
- **Delete Properties**: From the properties list
- **Upload Images**: Automatic compression and optimization

#### Inquiry Management
- **View All Inquiries**: `/admin/inquiries`
- **Update Inquiry Status**: Mark as contacted/closed
- **Contact Information**: Direct access to customer details

#### Dashboard Analytics
- **Total Properties**: Live count
- **Active Inquiries**: Unread inquiries count
- **Monthly Sales**: Revenue tracking
- **Property Views**: Analytics data

### 5. Image Upload & Optimization

The system automatically:
- **Compresses images** to WebP format
- **Resizes** to maximum 1200x800px
- **Reduces file size** by 60-80%
- **Stores** in Supabase Storage
- **Serves** optimized images to visitors

#### Image Upload Limits
- **Max file size**: 5MB per image
- **Supported formats**: JPG, PNG, WebP
- **Auto-conversion**: All images converted to WebP
- **Compression quality**: 80% (adjustable)

### 6. Security Features

#### Row Level Security (RLS)
- **Public Access**: Visitors can view properties and testimonials
- **Admin Access**: Full CRUD operations for authenticated admins
- **Inquiry Submission**: Anyone can submit inquiries
- **Image Upload**: Only authenticated users can upload

#### Authentication
- **Admin Only**: No visitor registration
- **Session Management**: Secure JWT tokens
- **Auto Logout**: Sessions expire for security
- **Protected Routes**: Admin routes require authentication

### 7. Production Deployment

#### Vercel Deployment
1. **Connect GitHub**: Link your repository to Vercel
2. **Environment Variables**: Add all required env vars
3. **Deploy**: Automatic deployment on push to main branch

#### Domain Setup
1. **Custom Domain**: Add your domain in Vercel settings
2. **SSL Certificate**: Automatically provided by Vercel
3. **DNS Configuration**: Point your domain to Vercel

### 8. Content Management

#### Adding Properties
1. **Login to Admin**: `/admin/login`
2. **Navigate to Properties**: `/admin/properties`
3. **Click "Add New Property"**
4. **Fill in Details**:
   - Title, description, price
   - Location, type, bedrooms, bathrooms
   - Features (comma-separated)
   - Upload multiple images
5. **Save**: Property goes live immediately

#### Managing Inquiries
1. **View Inquiries**: `/admin/inquiries`
2. **Update Status**: Mark as contacted/closed
3. **Contact Customer**: Use provided email/phone
4. **Track Progress**: Monitor inquiry pipeline

### 9. Maintenance & Updates

#### Regular Tasks
- **Monitor Inquiries**: Check daily for new inquiries
- **Update Properties**: Keep listings current
- **Review Analytics**: Track performance metrics
- **Backup Data**: Supabase handles automatic backups

#### Content Updates
- **Property Photos**: Replace with high-quality images
- **Descriptions**: Keep detailed and accurate
- **Pricing**: Update regularly based on market
- **Features**: Highlight unique selling points

### 10. Support & Troubleshooting

#### Common Issues
- **Login Problems**: Check email/password in Supabase Auth
- **Image Upload Fails**: Check file size and format
- **Properties Not Showing**: Verify database connection
- **Slow Loading**: Images are automatically optimized

#### Getting Help
- **Database Issues**: Check Supabase dashboard logs
- **Authentication**: Verify user exists in Supabase Auth
- **Performance**: Monitor Vercel analytics
- **Errors**: Check browser console for details

---

## 🎉 Your Mannadome Estate website is now ready for business!

**Admin Login**: `/admin/login`  
**Email**: `info.mannadomeestate@gmail.com`  
**Dashboard**: `/admin/dashboard`

The website includes sample properties and testimonials. Replace with your actual content through the admin dashboard.

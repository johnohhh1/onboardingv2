# 🚀 Render Deployment Guide

This guide will help you deploy the Restaurant Onboarding System to Render with a persistent PostgreSQL database.

## 📋 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Your code should be pushed to GitHub
3. **Domain (Optional)** - Custom domain for production

## 🗄️ Step 1: Create PostgreSQL Database

1. **Log into Render Dashboard**
2. **Click "New +" → "PostgreSQL"**
3. **Configure Database:**
   - **Name**: `onboarding-db`
   - **Database**: `onboarding`
   - **User**: `onboarding_user`
   - **Plan**: Free (or paid for production)
4. **Click "Create Database"**
5. **Copy the Internal Database URL** (you'll need this later)

## 🌐 Step 2: Deploy Web Service

1. **Click "New +" → "Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service:**

### Basic Settings
- **Name**: `onboarding-system`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (if repo is at root)

### Build & Deploy Settings
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npx prisma db push && npm run db:seed && npm start`

### Environment Variables
Add these environment variables:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_internal_url_from_step_1
NEXTAUTH_SECRET=generate_a_random_secret_key
NEXTAUTH_URL=https://your-app-name.onrender.com
```

### Advanced Settings
- **Auto-Deploy**: Enabled
- **Health Check Path**: `/api/health` (optional)

## 🔧 Step 3: Environment Variables Setup

### Required Variables:

1. **DATABASE_URL**
   - Get this from your PostgreSQL database in Render
   - Format: `postgresql://username:password@host:port/database`

2. **NEXTAUTH_SECRET**
   - Generate a random string (32+ characters)
   - You can use: `openssl rand -base64 32`

3. **NEXTAUTH_URL**
   - Your Render app URL
   - Format: `https://your-app-name.onrender.com`

4. **NODE_ENV**
   - Set to: `production`

## 🗄️ Step 4: Database Migration

The app will automatically:
1. **Push the schema** to your PostgreSQL database
2. **Seed initial data** with all 7 Chili's restaurants
3. **Create checklist templates** for each restaurant

## 🔍 Step 5: Verify Deployment

1. **Check Build Logs** - Ensure no errors during build
2. **Test Database Connection** - App should start without database errors
3. **Verify Data** - Check that restaurants are populated
4. **Test Features** - Add a team member and test functionality

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure database is created and running
   - Verify network access

2. **Build Fails**
   - Check Node.js version (requires 18+)
   - Verify all dependencies in package.json
   - Check build logs for specific errors

3. **App Won't Start**
   - Verify start command includes database setup
   - Check environment variables
   - Review application logs

4. **Data Not Persisting**
   - Ensure using PostgreSQL (not SQLite)
   - Check database connection string
   - Verify migrations ran successfully

## 🔄 Updating the App

1. **Push changes to GitHub**
2. **Render will auto-deploy** (if enabled)
3. **Monitor build logs** for any issues
4. **Test the updated app**

## 📊 Monitoring

- **Render Dashboard** - Monitor app health and logs
- **Database Dashboard** - Check database performance
- **Application Logs** - Debug issues in real-time

## 🔒 Security Notes

1. **Environment Variables** - Never commit secrets to Git
2. **Database Access** - Use internal URLs for security
3. **HTTPS** - Render provides SSL certificates automatically
4. **Backups** - Consider database backups for production

## 🎯 Production Checklist

- [ ] Database created and connected
- [ ] Environment variables configured
- [ ] App builds successfully
- [ ] Database migrations completed
- [ ] Initial data seeded
- [ ] All features working
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up

## 📞 Support

If you encounter issues:
1. **Check Render documentation**
2. **Review application logs**
3. **Verify environment variables**
4. **Test database connection**

---

**Your app will be available at**: `https://your-app-name.onrender.com`

**Database will persist data** across deployments and restarts! 
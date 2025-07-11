# 🍽️ Restaurant Team Member Onboarding System v2.0

A comprehensive multi-restaurant team member onboarding management system built with Next.js 14, React, Tailwind CSS, and PostgreSQL.

## ✨ Features

### 🏢 Multi-Restaurant Management
- **Area Manager Dashboard** - Overview of all restaurants
- **Individual Restaurant Dashboards** - Detailed team member tracking
- **Restaurant Selection Interface** - Easy navigation between locations

### 👥 Team Member Management
- **Add/Edit Team Members** - Complete registration system
- **Progress Tracking** - Real-time onboarding progress
- **Status Management** - In Progress, Completed, Not Started, On Hold
- **Priority Levels** - High, Medium, Normal, Low priority tracking

### 📋 Interactive Checklist System
- **40+ Tasks** organized in 5 phases
- **Smart Input Fields** - Copy-to-clipboard functionality
- **Progress Saving** - Auto-save checklist progress
- **Phase-based Organization**:
  - Phase 1: Setting Up New TM
  - Phase 2: Prior to First Day
  - Phase 3: Prepare Materials
  - Phase 4: First Day
  - Phase 5: Post First Day

### 🎯 Team Member Actions
- **Delete TM** - Remove team members who quit mid-onboarding
- **Mark Complete & Remove** - Mark 100% complete and remove from active queue
- **Print Reports** - Professional print-friendly team member reports
- **Email Integration** - Use device's default email client for team member updates

### 📊 Success Tracking
- **Gold Star Success Stats** - Visual success rate tracking
- **Completion Analytics** - Real-time progress monitoring
- **Success Rate Visualization** - Progress bars and statistics

### 🌙 Dark Mode Support
- **Theme Toggle** - Switch between light and dark modes
- **System Preference Detection** - Automatic theme detection
- **Persistent Settings** - Remember user's theme preference

### 📈 Reporting & Export
- **CSV Reports** - Professional restaurant-specific reports
- **Multi-Restaurant Reports** - Area manager overview reports
- **JSON Export** - Detailed raw data export
- **Print Functionality** - Professional print layouts

### 🔄 Data Management
- **Reset Function** - Area manager can reset all data for deployment
- **Restaurant Management** - Edit restaurant details (name, manager, contact info)
- **Data Persistence** - Local storage for progress and settings

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johnohhh1/onboardingv2.git
   cd onboardingv2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
onboardingv2/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page
├── components/             # React components
│   ├── AreaManagerDashboard.js
│   ├── ChecklistModal.js
│   ├── RestaurantDashboard.js
│   └── ThemeToggle.js
├── lib/                   # Utility libraries
│   └── ThemeContext.js    # Dark mode context
├── prisma/                # Database schema
│   └── schema.prisma
└── package.json           # Dependencies and scripts
```

## 🎨 Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: React Context API
- **Database**: PostgreSQL (via Prisma)

## 📱 Features Overview

### Restaurant Selection
- Choose from 7 Chili's locations
- Area Manager option for multi-restaurant view
- Search and filter functionality

### Team Member Dashboard
- Real-time progress tracking
- Interactive checklist system
- Status and priority management
- Success statistics

### Area Manager Features
- Multi-restaurant overview
- Generate comprehensive reports
- Reset data for deployment
- Restaurant management

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Next.js
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### Tailwind Configuration
The project uses Tailwind CSS with dark mode support. Configuration is in `tailwind.config.js`.

## 📊 Usage

### Adding Team Members
1. Select a restaurant from the landing page
2. Click "Add Team Member" button
3. Fill in the registration form
4. Select position (Server, Host, Cook, Bartender, Runner, QA, To-Go Prep, Dishwasher, Busser, Manager, Trainer)
5. Set priority and start date

### Managing Progress
1. Click "View/Edit Progress" on any team member card
2. Use the interactive checklist to track progress
3. Save progress automatically
4. Mark tasks as completed

### Generating Reports
1. Use "Generate Report" button for CSV exports
2. Use "Export Data" for detailed JSON exports
3. Use print icon for professional print reports

### Area Manager Functions
1. Access Area Manager from landing page
2. View multi-restaurant statistics
3. Generate area-wide reports
4. Use "Reset Data" for deployment preparation

## 🎯 Key Features

### Team Member Actions
- **✅ Complete & Remove** - Mark 100% complete
- **🗑️ Delete** - Remove quitters from system
- **🖨️ Print** - Professional reports
- **📧 Email** - Default email client integration

### Success Tracking
- **🏆 Gold Star Stats** - Visual success tracking
- **📈 Progress Bars** - Real-time completion rates
- **📊 Analytics** - Detailed success metrics

### Dark Mode
- **🌙 Theme Toggle** - Easy theme switching
- **⚙️ Auto-Detection** - System preference detection
- **💾 Persistence** - Remember user preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💼 Author

**John Olenski** - *Area Manager* - [john.olenski@chilis.com](mailto:john.olenski@chilis.com)

## 🙏 Acknowledgments

- Built for Chili's restaurant chain
- Multi-restaurant onboarding management
- Comprehensive team member tracking
- Professional reporting system

---

**Version**: 2.0  
**Last Updated**: January 2025  
**Status**: Ready for Production Deployment 
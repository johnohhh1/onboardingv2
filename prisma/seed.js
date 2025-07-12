const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create initial restaurants
  const restaurants = [
    {
      name: "Chili's Auburn Hills",
      code: "605",
      location: "Auburn Hills, MI",
      address: "1422 Squirrel Rd, Auburn Hills, MI 48326",
      phone: "(248) 555-0123",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's O-Mall",
      code: "316",
      location: "Troy, MI",
      address: "456 Big Beaver Rd, Troy, MI 48083",
      phone: "(248) 555-0124",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's Fort Gratiot",
      code: "1107",
      location: "Fort Gratiot, MI",
      address: "1107 Gratiot Ave, Fort Gratiot, MI 48059",
      phone: "(810) 555-0125",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's Rochester",
      code: "195",
      location: "Rochester, MI",
      address: "316 Rochester Rd, Rochester, MI 48307",
      phone: "(248) 555-0126",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's Gratiot Avenue",
      code: "954",
      location: "Roseville, MI",
      address: "954 Gratiot Ave, Roseville, MI 48066",
      phone: "(586) 555-0127",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's Warren",
      code: "1422",
      location: "Warren, MI",
      address: "195 Warren Blvd, Warren, MI 48088",
      phone: "(586) 555-0128",
      email: "",
      timezone: "America/Detroit"
    },
    {
      name: "Chili's Shelby Creek",
      code: "734",
      location: "Shelby Creek, MI",
      address: "734 Shelby Creek Rd, Shelby Creek, MI 48315",
      phone: "(586) 555-0129",
      email: "",
      timezone: "America/Detroit"
    }
  ];

  console.log('🏪 Creating restaurants...');
  
  for (const restaurantData of restaurants) {
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { code: restaurantData.code }
    });

    if (!existingRestaurant) {
      const restaurant = await prisma.restaurant.create({
        data: restaurantData
      });
      console.log(`✅ Created restaurant: ${restaurant.name}`);
    } else {
      console.log(`⏭️  Restaurant already exists: ${existingRestaurant.name}`);
    }
  }

  // Create default checklist template for each restaurant
  console.log('📋 Creating checklist templates...');
  
  const allRestaurants = await prisma.restaurant.findMany();
  
  for (const restaurant of allRestaurants) {
    const existingTemplate = await prisma.checklistTemplate.findFirst({
      where: { 
        restaurantId: restaurant.id,
        isDefault: true 
      }
    });

    if (!existingTemplate) {
      const template = await prisma.checklistTemplate.create({
        data: {
          name: "Standard Onboarding Checklist",
          description: "Default onboarding checklist for new team members",
          restaurantId: restaurant.id,
          isDefault: true,
          isActive: true
        }
      });

      // Create checklist tasks
      const tasks = [
        // Phase 1: Setting Up New TM
        { title: "Call with offer", step: 1, category: "Setup", order: 1, isRequired: true, estimatedMinutes: 15 },
        { title: "Set start date", step: 1, category: "Setup", order: 2, isRequired: true, estimatedMinutes: 10 },
        { title: "Download Zoom app", step: 1, category: "Setup", order: 3, isRequired: true, estimatedMinutes: 5 },
        { title: "Complete Krow Hire", step: 1, category: "Setup", order: 4, isRequired: true, estimatedMinutes: 30 },
        { title: "Complete New Hire App", step: 1, category: "Setup", order: 5, isRequired: true, estimatedMinutes: 45 },
        { title: "Complete Oracle Offer", step: 1, category: "Setup", order: 6, isRequired: true, estimatedMinutes: 20 },
        { title: "Get person number", step: 1, category: "Setup", order: 7, isRequired: true, estimatedMinutes: 10 },
        { title: "Complete onboarding journey", step: 1, category: "Setup", order: 8, isRequired: true, estimatedMinutes: 60 },
        
        // Phase 2: Prior to First Day
        { title: "Schedule VFDO", step: 2, category: "Pre-First Day", order: 9, isRequired: true, estimatedMinutes: 15 },
        { title: "Complete I-9 documents", step: 2, category: "Pre-First Day", order: 10, isRequired: true, estimatedMinutes: 30 },
        { title: "Get headphones/phone", step: 2, category: "Pre-First Day", order: 11, isRequired: true, estimatedMinutes: 10 },
        { title: "Review dress code", step: 2, category: "Pre-First Day", order: 12, isRequired: true, estimatedMinutes: 5 },
        
        // Phase 3: Prepare Materials
        { title: "Verify onboarding completion", step: 3, category: "Materials", order: 13, isRequired: true, estimatedMinutes: 10 },
        { title: "Assign job code", step: 3, category: "Materials", order: 14, isRequired: true, estimatedMinutes: 5 },
        { title: "Prepare training materials", step: 3, category: "Materials", order: 15, isRequired: true, estimatedMinutes: 30 },
        { title: "Set up workstation", step: 3, category: "Materials", order: 16, isRequired: true, estimatedMinutes: 15 },
        
        // Phase 4: First Day
        { title: "Welcome and introductions", step: 4, category: "First Day", order: 17, isRequired: true, estimatedMinutes: 30 },
        { title: "Tour of restaurant", step: 4, category: "First Day", order: 18, isRequired: true, estimatedMinutes: 20 },
        { title: "Safety training", step: 4, category: "First Day", order: 19, isRequired: true, estimatedMinutes: 60 },
        { title: "POS system training", step: 4, category: "First Day", order: 20, isRequired: true, estimatedMinutes: 90 },
        { title: "Food safety training", step: 4, category: "First Day", order: 21, isRequired: true, estimatedMinutes: 45 },
        { title: "Customer service training", step: 4, category: "First Day", order: 22, isRequired: true, estimatedMinutes: 60 },
        
        // Phase 5: Post First Day
        { title: "Review first day", step: 5, category: "Post First Day", order: 23, isRequired: true, estimatedMinutes: 15 },
        { title: "Schedule follow-up", step: 5, category: "Post First Day", order: 24, isRequired: true, estimatedMinutes: 10 },
        { title: "Complete feedback form", step: 5, category: "Post First Day", order: 25, isRequired: true, estimatedMinutes: 20 },
        { title: "Plan next training session", step: 5, category: "Post First Day", order: 26, isRequired: true, estimatedMinutes: 15 }
      ];

      for (const taskData of tasks) {
        await prisma.checklistTask.create({
          data: {
            ...taskData,
            templateId: template.id
          }
        });
      }

      console.log(`✅ Created checklist template for: ${restaurant.name}`);
    } else {
      console.log(`⏭️  Checklist template already exists for: ${restaurant.name}`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    console.error('Stack trace:', e.stack);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }); 
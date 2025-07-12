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
  console.log('🔄 Using updated seed script with proper deletion order...');

  try {
    // Clear all existing data in the correct order to avoid foreign key violations
    console.log('🗑️  Clearing existing data...');
    
    // Delete in order: tasks -> templates -> team members -> restaurants
    await prisma.checklistTask.deleteMany({});
    console.log('✅ Cleared checklist tasks');
    
    await prisma.checklistTemplate.deleteMany({});
    console.log('✅ Cleared checklist templates');
    
    await prisma.teamMember.deleteMany({});
    console.log('✅ Cleared team members');
    
    await prisma.restaurant.deleteMany({});
    console.log('✅ Cleared all restaurants');

    // Create exactly 7 restaurants as specified
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
        address: "1234 Rochester Rd, Troy, MI 48083",
        phone: "(248) 555-0124",
        email: "",
        timezone: "America/Detroit"
      },
      {
        name: "Chili's Fort Gratiot",
        code: "1107",
        location: "Fort Gratiot, MI",
        address: "5678 Gratiot Ave, Fort Gratiot, MI 48059",
        phone: "(810) 555-0125",
        email: "",
        timezone: "America/Detroit"
      },
      {
        name: "Chili's Rochester",
        code: "195",
        location: "Rochester, MI",
        address: "9012 Rochester Rd, Rochester, MI 48307",
        phone: "(248) 555-0126",
        email: "",
        timezone: "America/Detroit"
      },
      {
        name: "Chili's Gratiot Avenue",
        code: "954",
        location: "Clinton Township, MI",
        address: "3456 Gratiot Ave, Clinton Township, MI 48035",
        phone: "(586) 555-0127",
        email: "",
        timezone: "America/Detroit"
      },
      {
        name: "Chili's Warren",
        code: "1422",
        location: "Warren, MI",
        address: "7890 Hall Rd, Warren, MI 48088",
        phone: "(586) 555-0128",
        email: "",
        timezone: "America/Detroit"
      },
      {
        name: "Chili's Shelby Creek",
        code: "734",
        location: "Shelby Township, MI",
        address: "4567 Hall Rd, Shelby Township, MI 48315",
        phone: "(586) 555-0129",
        email: "",
        timezone: "America/Detroit"
      }
    ];

    console.log('🏪 Creating restaurants...');
    for (const restaurantData of restaurants) {
      const restaurant = await prisma.restaurant.create({
        data: restaurantData
      });
      console.log(`✅ Created: ${restaurant.name} (#${restaurant.code})`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Created ${restaurants.length} restaurants`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  }); 
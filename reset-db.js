const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function resetDatabase() {
  console.log('🗑️  COMPLETELY RESETTING DATABASE...');
  
  try {
    // Delete everything
    await prisma.checklistTask.deleteMany({});
    await prisma.checklistTemplate.deleteMany({});
    await prisma.teamMember.deleteMany({});
    await prisma.restaurant.deleteMany({});
    
    console.log('✅ Cleared all data');
    
    // Create exactly 7 restaurants
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

    console.log('🏪 Creating exactly 7 restaurants...');
    
    for (const restaurantData of restaurants) {
      const restaurant = await prisma.restaurant.create({
        data: restaurantData
      });
      console.log(`✅ Created: ${restaurant.name} (#${restaurant.code})`);
    }
    
    console.log('🎉 Database reset complete! You now have exactly 7 restaurants.');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase(); 
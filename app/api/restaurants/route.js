import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/restaurants - Get all restaurants
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}

// POST /api/restaurants - Create a new restaurant
export async function POST(request) {
  try {
    const body = await request.json();
    
    const restaurant = await prisma.restaurant.create({
      data: {
        name: body.name,
        code: body.code,
        location: body.location,
        address: body.address,
        phone: body.phone,
        email: body.email,
        timezone: body.timezone || 'America/Detroit'
      }
    });
    
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to create restaurant' },
      { status: 500 }
    );
  }
} 
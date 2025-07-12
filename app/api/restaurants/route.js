import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

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

// DELETE /api/restaurants - Delete a restaurant
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️  Attempting to delete restaurant with ID:', id);
    
    if (!id) {
      console.error('❌ No restaurant ID provided');
      return NextResponse.json(
        { error: 'Restaurant ID is required' },
        { status: 400 }
      );
    }
    
    // First check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingRestaurant) {
      console.error('❌ Restaurant not found with ID:', id);
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Found restaurant:', existingRestaurant.name);
    
    // Delete the restaurant
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id: parseInt(id) }
    });
    
    console.log('✅ Successfully deleted restaurant:', deletedRestaurant.name);
    
    return NextResponse.json({ 
      message: 'Restaurant deleted successfully',
      deletedRestaurant: deletedRestaurant.name
    });
  } catch (error) {
    console.error('❌ Error deleting restaurant:', error);
    return NextResponse.json(
      { error: `Failed to delete restaurant: ${error.message}` },
      { status: 500 }
    );
  }
} 
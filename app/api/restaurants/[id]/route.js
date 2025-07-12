import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/restaurants/[id] - Get a specific restaurant
export async function GET(request, { params }) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: params.id },
      include: {
        teamMembers: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurant' },
      { status: 500 }
    );
  }
}

// PUT /api/restaurants/[id] - Update a restaurant
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: params.id },
      data: {
        name: body.name,
        code: body.code,
        location: body.location,
        phone: body.phone,
        email: body.email,
        // Store manager in settings since it's not a direct field
        settings: {
          ...body.settings,
          manager: body.manager
        }
      }
    });
    
    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    );
  }
}

// DELETE /api/restaurants/[id] - Delete a restaurant
export async function DELETE(request, { params }) {
  try {
    await prisma.restaurant.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to delete restaurant' },
      { status: 500 }
    );
  }
} 
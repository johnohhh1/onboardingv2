import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET /api/restaurants - Get all restaurants
export async function GET() {
  try {
    const { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('name');

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch restaurants' },
        { status: 500 }
      );
    }

    console.log('✅ Fetched restaurants:', restaurants?.length || 0);
    return NextResponse.json(restaurants || []);
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/restaurants - Create a new restaurant
export async function POST(request) {
  try {
    const restaurantData = await request.json();
    
    console.log('🍽️  Creating restaurant:', restaurantData.name);
    
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .insert([restaurantData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create restaurant' },
        { status: 500 }
      );
    }

    console.log('✅ Created restaurant:', restaurant.name);
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/restaurants - Update a restaurant
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const restaurantData = await request.json();
    
    console.log('🔄 Updating restaurant with ID:', id);
    
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .update(restaurantData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update restaurant' },
        { status: 500 }
      );
    }

    console.log('✅ Updated restaurant:', restaurant.name);
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/restaurants - Delete a restaurant
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('🗑️  Deleting restaurant with ID:', id);
    
    if (!id) {
      console.error('❌ No restaurant ID provided');
      return NextResponse.json(
        { error: 'Restaurant ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('restaurants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete restaurant' },
        { status: 500 }
      );
    }

    console.log('✅ Deleted restaurant with ID:', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
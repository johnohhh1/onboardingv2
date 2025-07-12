import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET /api/team-members - Get all team members
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    let query = supabase.from('team_members').select('*');
    if (restaurantId) {
      query = query.eq('restaurantId', restaurantId);
    }
    query = query.order('createdAt', { ascending: false });
    const { data: teamMembers, error } = await query;
    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
    return NextResponse.json(teamMembers || []);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

// POST /api/team-members - Create a new team member
export async function POST(request) {
  try {
    // Check environment variables first
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('❌ Missing Supabase environment variables');
      return NextResponse.json({ 
        error: 'Missing Supabase configuration',
        details: 'Environment variables not set'
      }, { status: 500 });
    }

    const body = await request.json();
    console.log('Creating team member with data:', body);
    
    // Validate required fields
    if (!body.name || !body.restaurantId) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'Name and restaurantId are required'
      }, { status: 400 });
    }
    
    // Map the data to match the actual database schema (snake_case for Supabase/Postgres)
    const teamMemberData = {
      name: body.name,
      email: body.email || '',
      phone: body.phone || '',
      position: body.position || '',
      start_date: body.startDate ? new Date(body.startDate) : null,
      status: body.status || 'NOT_STARTED',
      priority: body.priority || 'medium',
      notes: body.notes || null,
      restaurant_id: body.restaurantId
    };
    
    console.log('Team member data to insert:', teamMemberData);
    
    const { data: teamMember, error } = await supabase
      .from('team_members')
      .insert([teamMemberData])
      .select()
      .single();
      
    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ 
        error: `Failed to create team member: ${error.message}`,
        details: error.details || error.hint || 'Unknown database error'
      }, { status: 500 });
    }
    
    console.log('✅ Team member created successfully:', teamMember);
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ 
      error: 'Failed to create team member',
      details: error.message 
    }, { status: 500 });
  }
} 
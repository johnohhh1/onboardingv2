import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET /api/team-members - Get all team members
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    let query = supabase.from('team_members').select('*');
    if (restaurantId) {
      query = query.eq('restaurant_id', restaurantId);
    }
    query = query.order('created_at', { ascending: false });
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
    const body = await request.json();
    const { data: teamMember, error } = await supabase
      .from('team_members')
      .insert([{
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        start_date: body.startDate,
        start_time: body.startTime,
        employee_id: body.employeeId,
        restaurant_id: body.restaurantId,
        assigned_to_id: body.assignedToId,
        status: body.status || 'NOT_STARTED'
      }])
      .select()
      .single();
    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
} 
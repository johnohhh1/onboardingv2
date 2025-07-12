import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/team-members/[id] - Get a specific team member
export async function GET(request, { params }) {
  try {
    const { data: teamMember, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', params.id)
      .single();
    if (error || !teamMember) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
  }
}

// PUT /api/team-members/[id] - Update a team member
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { data: teamMember, error } = await supabase
      .from('team_members')
      .update({
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        start_date: body.startDate,
        start_time: body.startTime,
        employee_id: body.employeeId,
        assigned_to_id: body.assignedToId,
        status: body.status,
        completion_date: body.completionDate
      })
      .eq('id', params.id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE /api/team-members/[id] - Delete a team member
export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', params.id);
    if (error) {
      return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
} 
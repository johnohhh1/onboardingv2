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
    console.log('Updating team member with data:', body);
    
    // Handle different types of updates
    let updateData = {};
    
    // If this is a checklist update (only checklistData in body)
    if (body.checklistData && Object.keys(body).length === 1) {
      updateData = {
        checklist_data: body.checklistData
      };
    } else {
      // Full team member update
      updateData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        start_date: body.startDate,
        start_time: body.startTime,
        employee_id: body.employeeId,
        restaurant_id: body.restaurantId,
        assigned_to_id: body.assignedToId,
        status: body.status,
        completion_date: body.completionDate
      };
    }
    
    console.log('Team member data to update:', updateData);
    
    const { data: teamMember, error } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();
      
    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: `Failed to update team member: ${error.message}` }, { status: 500 });
    }
    
    console.log('✅ Team member updated successfully:', teamMember);
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
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ error: `Failed to delete team member: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
} 
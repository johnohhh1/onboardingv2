import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/team-members/[id] - Get a specific team member
export async function GET(request, { params }) {
  try {
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
      include: {
        restaurant: true,
        assignedTo: true,
        checklistProgress: {
          include: {
            task: true
          }
        },
        notes: true
      }
    });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// PUT /api/team-members/[id] - Update a team member
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    
    const teamMember = await prisma.teamMember.update({
      where: { id: params.id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        startTime: body.startTime,
        employeeId: body.employeeId,
        assignedToId: body.assignedToId,
        status: body.status,
        completionDate: body.completionDate ? new Date(body.completionDate) : undefined
      },
      include: {
        restaurant: true,
        assignedTo: true
      }
    });
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE /api/team-members/[id] - Delete a team member
export async function DELETE(request, { params }) {
  try {
    await prisma.teamMember.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
} 
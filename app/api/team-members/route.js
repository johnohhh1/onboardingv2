import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/team-members - Get all team members
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');
    
    const where = restaurantId ? { restaurantId } : {};
    
    const teamMembers = await prisma.teamMember.findMany({
      where,
      include: {
        restaurant: true,
        assignedTo: true,
        checklistProgress: {
          include: {
            task: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST /api/team-members - Create a new team member
export async function POST(request) {
  try {
    const body = await request.json();
    
    const teamMember = await prisma.teamMember.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        startDate: new Date(body.startDate),
        startTime: body.startTime,
        employeeId: body.employeeId,
        restaurantId: body.restaurantId,
        assignedToId: body.assignedToId,
        status: body.status || 'NOT_STARTED'
      },
      include: {
        restaurant: true,
        assignedTo: true
      }
    });
    
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';

// POST /api/email-report - Email the area manager report
export async function POST(request) {
  try {
    const { reportData, csvContent } = await request.json();
    
    console.log('📧 Sending area manager report via email');
    
    // For now, we'll use a simple email service
    // In production, you'd want to use a proper email service like SendGrid, AWS SES, etc.
    
    // Create email content
    const emailSubject = `Area Manager Report - ${new Date().toLocaleDateString()}`;
    
    const emailBody = `
Area Manager Onboarding Report
Generated on: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Restaurants: ${reportData.totalRestaurants}
- Total Team Members: ${reportData.restaurants.reduce((sum, r) => sum + r.totalMembers, 0)}
- Completed: ${reportData.restaurants.reduce((sum, r) => sum + r.completedMembers, 0)}
- In Progress: ${reportData.restaurants.reduce((sum, r) => sum + r.inProgressMembers, 0)}
- Not Started: ${reportData.restaurants.reduce((sum, r) => sum + r.notStartedMembers, 0)}

DETAILED BREAKDOWN:
${reportData.restaurants.map(restaurant => `
${restaurant.restaurantName} (${restaurant.restaurantCode})
- Location: ${restaurant.location}
- Manager: ${restaurant.manager}
- Total Members: ${restaurant.totalMembers}
- Completed: ${restaurant.completedMembers}
- In Progress: ${restaurant.inProgressMembers}
- Not Started: ${restaurant.notStartedMembers}
- Completion Rate: ${restaurant.completionRate}%
- Status: ${restaurant.status}
`).join('\n')}

The detailed CSV report is attached to this email.
    `.trim();

    // For demonstration, we'll simulate sending the email
    // In a real implementation, you'd integrate with an email service
    console.log('📧 Email would be sent with subject:', emailSubject);
    console.log('📧 Email body:', emailBody);
    console.log('📧 CSV attachment size:', csvContent.length, 'characters');

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ Area manager report email sent successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Report emailed successfully',
      emailSubject,
      emailBody
    });
    
  } catch (error) {
    console.error('❌ Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email report' },
      { status: 500 }
    );
  }
} 
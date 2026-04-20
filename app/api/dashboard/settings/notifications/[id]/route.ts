import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminAny } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/dashboard/settings/notifications/[id]
 * Update notification preference
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdminAny();
    const body = await request.json();
    const { is_enabled } = body;

    const { error } = await admin
      .from('notification_preferences')
      .update({ is_enabled })
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update notification preference' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notification preference:', error);
    return NextResponse.json(
      { error: 'Failed to update notification preference' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/dashboard/settings/notifications/[id]
 * Delete notification preference
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdminAny();
    const { error } = await admin
      .from('notification_preferences')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete notification preference' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting notification preference:', error);
    return NextResponse.json(
      { error: 'Failed to delete notification preference' },
      { status: 500 }
    );
  }
}

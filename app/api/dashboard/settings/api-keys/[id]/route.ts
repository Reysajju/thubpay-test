import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminAny } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * DELETE /api/dashboard/settings/api-keys/[id]
 * Delete an API key
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdminAny();
    const { error } = await admin
      .from('api_keys')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete API key' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminAny } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * DELETE /api/dashboard/settings/gateways/[id]
 * Delete a gateway
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdminAny();
    const { error } = await admin
      .from('gateway_credentials')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete gateway' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gateway:', error);
    return NextResponse.json(
      { error: 'Failed to delete gateway' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/dashboard/analytics/top-customers
 * Get top customers for analytics
 */
export async function GET(request: NextRequest) {
  try {
    const admin = getSupabaseAdmin();
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30d';

    const now = new Date();
    let startDate = new Date();

    // Calculate date range based on period
    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get client spending
    const { data: clients, error } = await admin
      .from('clients')
      .select('id, email, total_spend_cents, transaction_count, last_payment_at')
      .gte('total_spend_cents', 1000) // Only clients with at least $10
      .order('total_spend_cents', { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch top customers' },
        { status: 500 }
      );
    }

    return NextResponse.json({ top_customers: clients || [] });
  } catch (error) {
    console.error('Error fetching top customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top customers' },
      { status: 500 }
    );
  }
}

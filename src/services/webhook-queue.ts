import { getSupabaseAdminAny } from '@/utils/supabase/admin';

const getAdmin = () => getSupabaseAdminAny();

export async function enqueueWebhookJob(input: {
  gateway: string;
  eventId: string;
  eventType: string;
  payload: string;
}) {
  const admin = getAdmin();
  await (admin as any).from('webhook_jobs').insert({
    gateway_slug: input.gateway,
    event_id: input.eventId,
    event_type: input.eventType,
    payload: input.payload,
    status: 'queued'
  });
}

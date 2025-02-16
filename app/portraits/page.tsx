import { createClient } from '@/utils/supabase/server';

export default async function Portraits() {
  const supabase = await createClient();

  const data = await supabase
  .storage
  .from('portraits')
  .getPublicUrl('001.jpg');



  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

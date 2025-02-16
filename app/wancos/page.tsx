import { createClient } from '@/utils/supabase/server';

export default async function Wancos() {
  const supabase = await createClient();
  const { data: wancos, error } = await supabase.from("wancos").select();
  const portraits = await supabase.storage.from('portraits');

  if (error) {
    return <div>wancoの取得でエラーが発生しました</div>
  }

  return (
    <>
      {wancos.length > 0 &&
        <ul>
          {wancos.map(wanco => (
            <li key={wanco.id}>
              <img src={portraits.getPublicUrl(String(wanco.number).padStart(3, '0') + '.jpg').data.publicUrl} alt={wanco.name_ja} />
              {wanco.name_ja}({String(wanco.number).padStart(3, '0')})
            </li>
          ))}
        </ul>
      }
      <pre>{JSON.stringify(wancos, null, 2)}</pre>
    </>
  )
}

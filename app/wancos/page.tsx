import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function Wancos() {
  const supabase = await createClient();
  const { data: wancos, error } = await supabase.from("wancos").select();
  const portraits = await supabase.storage.from('portraits');

  if (error) {
    return <div>wancoの取得でエラーが発生しました</div>
  }

  return (
    <div className="container mx-auto px-4">
     {wancos && wancos.length > 0 && (
        <ul className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {wancos.map((wanco) => {
            const paddedNumber = wanco.number ? String(wanco.number).padStart(3, '0') : '000';
            const { data: publicUrl } = supabase.storage
              .from('portraits')
              .getPublicUrl(`${paddedNumber}.jpg`);

            return (
              <li key={wanco.id} className="block">
                <a href={`/wancos/${wanco.id}`} className="group/card flex flex-col items-center gap-y-1">
                  <figure className="w-full border border-gray-300 rounded-md overflow-hidden
                                     group-hover/card:shadow-md transition-shadow duration-300">
                    <Image
                      src={publicUrl.publicUrl}
                      alt={wanco.name_ja}
                      loading="lazy"
                      layout="responsive"
                      width={300}
                      height={300}
                      className="w-full h-full aspect-square object-cover"
                    />
                  </figure>
                  <p className="text-xs text-gray-500">
                    {wanco.name_ja} ({paddedNumber})
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <pre>{JSON.stringify(wancos, null, 2)}</pre>
    </div>
  )
}

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export default async function Wancos({ params }: Props) {
  const supabase = await createClient();
  const { data: wanco, error } = await supabase.from("wancos").select().eq('id', params.id);

  if (error) {
    return <div>wancoの取得でエラーが発生しました</div>
  }

  const { data: portrait } = await supabase.storage
    .from('portraits')
    .getPublicUrl(wanco[0].portrait);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-2xl font-bold">{wanco[0].name_ja}</h1>
        <p className="text-sm text-gray-500">{wanco[0].name_en}</p>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <Image
          src={portrait.publicUrl}
          alt={wanco[0].name_ja}
          width={300}
          height={300}
          className="w-full h-full aspect-square object-cover"
        />
      </div>

      <Link href="/wancos" className="text-blue-500">
        一覧に戻る
      </Link>
    </div>
  )
}

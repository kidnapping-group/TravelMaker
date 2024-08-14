import Image from "next/image";

interface Props {
  bannerImageUrl: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

function ShortActivityCard({ bannerImageUrl, title, price, rating, reviewCount }: Props) {
  return (
    <article className="relative flex w-[240px] flex-col gap-4 pb-2 pc:w-auto">
      <div className="group relative aspect-video w-full overflow-hidden rounded-[10px]">
        <Image className="object-cover" src={bannerImageUrl} alt="체험 사진" fill />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
      </div>
      <div className="mx-1 flex flex-col gap-1">
        <div className="flex items-center gap-[2px] text-xs font-semibold">
          <Image src="icons/star.svg" alt="별 아이콘" height={14} width={14} />
          <p>{rating.toFixed(1)}</p>
          <p className="text-gray-400">({reviewCount})</p>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-md font-medium text-gray-500">
          <strong className="font-bold text-black">₩ {price.toLocaleString()}</strong> / 인
        </p>
      </div>
    </article>
  );
}

export default ShortActivityCard;

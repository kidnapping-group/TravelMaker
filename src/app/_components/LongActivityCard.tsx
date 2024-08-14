import Image from "next/image";

interface Props {
  bannerImageUrl: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

function LongActivityCard({ bannerImageUrl, title, price, rating, reviewCount }: Props) {
  return (
    <article className="group relative flex aspect-square w-[240px] flex-col justify-end overflow-hidden rounded-[10px] p-5 pc:w-auto">
      <div>
        <Image className="object-cover" src={bannerImageUrl} alt="체험 사진" fill />
        <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-50" />
      </div>
      <div className="z-10 mx-1 flex flex-col gap-2 text-white">
        <div className="flex items-center gap-1 text-md font-semibold">
          <Image src="/icons/star.svg" alt="별 아이콘" height={16} width={16} />
          <p>{rating.toFixed(1)}</p>
          <p>({reviewCount})</p>
        </div>
        <h3 className="line-clamp-2 h-16 text-xl font-bold">{title}</h3>
        <p className="text-md font-medium text-gray-400">
          <strong className="font-bold text-white">₩ {price.toLocaleString()}</strong> / 인
        </p>
      </div>
    </article>
  );
}

export default LongActivityCard;

// import Image from "next/image";
// import Link from "next/link";

// function MyActivityItem({activity}) {
//   return (
//     <Link href="/">
//       <div className="mx-auto flex h-[204px] w-[800px] rounded-[24px] shadow-lg">
//         <Image
//           src={activity.bannerImageUrl}
//           width={204}
//           height={204}
//           alt="배너 이미지"
//           className="rounded-l-[24px]"
//         />
//         <div className="flex h-full w-[596px] flex-col gap-[6px] px-6 py-[14px]">
//           <div className="flex items-center gap-[6px]">
//             <Image src="/icons/Icon_star_on.svg" width={19} height={19} alt="star" />
//             <p>{activity.rating}</p>
//             <p>({activity.reviewCount})</p>
//           </div>
//           <div className="flex h-full flex-col justify-between">
//             <h1 className="text-[18px] font-bold">{activity.title}</h1>
//             <div className="flex justify-between">
//               <div className="flex items-center gap-[10px] font-medium text-gray-600">
//                 <p className="text-2xl">₩{activity.price.toLocaleString()}</p>
//                 <p className="text-4">/인</p>
//               </div>
//               <Image src="/icons/icon_moresee.svg" width={40} height={40} alt="수정삭제버튼" />
//             </div>
//           </div>
//         </div>
//       </div>
//       </Link>
//   );
// }

// export default MyActivityItem;

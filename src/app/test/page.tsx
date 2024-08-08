import Swiper from "@/components/Swiper";

function Card({ children }: React.PropsWithChildren) {
  return (
    <div className="flex aspect-[7/8] min-w-[240px] items-center justify-center overflow-hidden rounded-lg border bg-gray-700 text-white">
      <span className="text-2xl font-semibold">{children}</span>
    </div>
  );
}

function Page() {
  return (
    <div className="m-auto flex h-screen max-w-[1200px] flex-col gap-2 rounded-md bg-gray-100">
      <h1 className="text-3xl font-bold">Carousel같은 Swiper 테스트 페이지입니다 ;D</h1>
      <p>
        <strong className="underline">PC 사이즈</strong>일 때는{" "}
        <strong className="underline">Swipe 가능한 Carousel</strong>이고,
        <br />
        <strong className="underline">태블릿, 모바일 사이즈</strong>일 때는{" "}
        <strong className="underline">Swiper</strong>로 동작합니다.
      </p>
      <p>
        Swiper 내부 Card에 <strong>aspect ratio</strong>와 <strong>win width</strong> 스타일을
        적용해줘야 기대한 대로 보여요.
        <br />
        swipe 동작을 위해 <strong>embla-carousel-react</strong> 라이브러리를 사용했습니다.
      </p>
      <Swiper>
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={index}>{index + 1}</Card>
        ))}
      </Swiper>
    </div>
  );
}

export default Page;

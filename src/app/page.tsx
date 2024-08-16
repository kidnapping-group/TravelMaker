import BigActivitySection from "@/app/_components/BigActivitySection";
import SearchForm from "@/app/_components/SearchForm";

async function Home() {
  return (
    <main className="flex flex-col items-center">
      <section className="flex w-full justify-center bg-black bg-opacity-50 px-5 pc:px-10">
        <div className="flex w-full max-w-[1200px] flex-col gap-8 pb-[50px] pt-[100px]">
          <div className="font-bold text-white">
            <h2 className="text-3xl">
              함께 배우면 즐거운
              <br /> 스트릿 댄스
            </h2>
            <p className="text-xl">1월의 인기 체험 BEST 🔥</p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl bg-white p-5">
            <h2 className="text-2lg font-bold">무엇을 체험하고 싶으신가요?</h2>
            <SearchForm placeholder="내가 원하는 체험은" />
          </div>
        </div>
      </section>

      <div className="flex w-full justify-center px-5 pc:px-10">
        <div className="mb-[100px] mt-[50px] flex w-full max-w-[1200px] flex-col gap-5">
          <BigActivitySection title="실시간 인기 체험" sort="most_reviewed" />
        </div>
      </div>
    </main>
  );
}

export default Home;

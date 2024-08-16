import ActivitySection from "@/app/_components/ActivitySection";
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
          <ActivitySection title="새로 오픈한 체험" sort="latest" />
          <ActivitySection title="일상을 풍요롭게 만드는 특별한 경험 🎨🎶" category="arts" />
          <ActivitySection title="입맛을 사로잡는 미식 여행 🍽️" category="food" />
          <ActivitySection title="에너지 넘치는 스포츠 체험 ⚽" category="sports" />
          <ActivitySection
            title="발걸음을 따라가는 새로운 이야기, 특별한 투어 🚶‍♂️"
            category="tour"
          />
          <ActivitySection title="웰빙으로 건강한 일상 만들기 🌱" category="wellbeing" />
          <ActivitySection title="손끝에 전해지는 짜릿한 손맛! 🐟" keyword="낚시" />
        </div>
      </div>
    </main>
  );
}

export default Home;

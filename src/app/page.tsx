import ActivitySection from "@/app/_components/ActivitySection";

async function Home() {
  return (
    <main className="m-auto w-full max-w-[1200px]">
      <div className="flex flex-col gap-5">
        <ActivitySection title="새로 오픈한 체험" sort="latest" />
        <ActivitySection title="일상을 풍요롭게 만드는 특별한 경험 🎨🎶" category="arts" />
        <ActivitySection title="입맛을 사로잡는 미식 여행 🍽️" category="food" />
        <ActivitySection title="에너지 넘치는 스포츠 체험 ⚽" category="sports" />
        <ActivitySection title="발걸음을 따라가는 새로운 이야기, 특별한 투어 🚶‍♂️" category="tour" />
        <ActivitySection title="웰빙으로 건강한 일상 만들기 🌱" category="wellbeing" />
        <ActivitySection title="손끝에 전해지는 짜릿한 손맛! 🐟" keyword="낚시" />
      </div>
    </main>
  );
}

export default Home;

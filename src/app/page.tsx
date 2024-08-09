import activitiesAPI from "@/apis/activitiesAPI";
import Link from "next/link";

import SearchForm from "./_components/SearchForm";

async function Home() {
  const { activities } = await activitiesAPI.get();

  return (
    <main>
      <section className="flex w-full justify-center bg-black bg-opacity-50">
        <div className="mx-5 flex w-full max-w-[1200px] flex-col gap-8 pb-[60px] pt-[100px]">
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

      {activities.map(item => (
        <Link href={`/${item.id}`} key={item.id}>
          {item.title}
        </Link>
      ))}
    </main>
  );
}

export default Home;

import activitiesAPI from "@/apis/activitiesAPI";
import Banner from "@/app/_components/Banner";
import SearchForm from "@/app/_components/SearchForm";
import Link from "next/link";

async function Home() {
  const { activities } = await activitiesAPI.get();

  return (
    <main className="flex flex-col items-center">
      <div className="relative flex w-full">
        <Banner />

        <div className="absolute bottom-16 flex w-full justify-center px-5 pc:px-10">
          <div className="flex w-full max-w-[1200px] flex-col gap-5 rounded-2xl bg-white p-5">
            <h2 className="text-2lg font-bold">무엇을 체험하고 싶으신가요?</h2>
            <SearchForm placeholder="내가 원하는 체험은" />
          </div>
        </div>
      </div>

      <div className="mb-[100px] mt-[50px] flex w-full max-w-[1200px] flex-col">
        <section className="flex flex-col">
          <h2 className="text-2lg font-bold text-black">🔥 인기 체험</h2>
          {activities.map(item => (
            <Link href={`/${item.id}`} key={item.id}>
              {item.title}
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Home;

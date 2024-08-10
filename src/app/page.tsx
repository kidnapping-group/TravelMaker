import activitiesAPI from "@/apis/activitiesAPI";
import Link from "next/link";

async function Home() {
  const { activities } = await activitiesAPI.get();
  return (
    <div className="flex flex-col gap-10">
      {activities.map(item => (
        <Link href={`/${item.id}`} key={item.id}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default Home;

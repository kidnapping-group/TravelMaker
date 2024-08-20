import Pagination from "@/components/Pagination";

function page() {
  return (
    <main className="m-auto flex justify-center py-20">
      <Pagination totalCount={50} pageSize={5} />
    </main>
  );
}

export default page;

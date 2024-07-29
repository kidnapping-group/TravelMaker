"use server";

async function Page({ searchParams }: { searchParams: { status: string } }) {
  let selectedStatus = searchParams.status;
  // if (status) {
  //   await getActivity({ selectedStatus });
  // } else {
  //   await getActivity();
  // }
  return <div>드롭 다운 조지기! selectedStatus: {selectedStatus}</div>;
}

export default Page;

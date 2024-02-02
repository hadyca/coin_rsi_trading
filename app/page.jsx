import { app } from "@/lib/app";

export default async function Page() {
  await app();

  return <div>시작페이지</div>;
}

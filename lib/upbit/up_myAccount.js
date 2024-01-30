import { up_getToken_noParams } from "@/utils/upbitToken";

export default async function up_getMyAccount() {
  const token = up_getToken_noParams();
  const options = {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  };
  try {
    const res = await fetch("https://api.upbit.com/v1/accounts", options);
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("업비트 내계정 정보 fetch 에러", error);
  }
}

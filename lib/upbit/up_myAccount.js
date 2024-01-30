import { up_getAuth_noParams } from "@/utils/upbitAuth";

export default async function up_getMyAccount() {
  const options = up_getAuth_noParams();
  try {
    const res = await fetch("https://api.upbit.com/v1/accounts", options);
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("업비트 내계정 정보 fetch 에러", error);
  }
}

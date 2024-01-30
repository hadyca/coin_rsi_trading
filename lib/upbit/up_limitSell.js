import { up_getToken_noParams, up_getToken_params } from "@/utils/upbitToken";

//진행중.. 지정가 매도할때 수량이랑 금액은 uuid로 조회해서 상태가 done이 되면 그 수량이랑 금액을 지정가매도 데이터로 쓴다.
//참고로 chatgpt에 uuid 반복 fetch하는 방법 적혀있다.
export default async function up_limitSell(volume, sellPrice) {
  const BUY = "ask"; //매수
  const SELL_PRICE = sellPrice * 1; //가진 잔액 %로 매수 가능
  const MARKET_BUY = "price";
  try {
    const body = {
      market: market,
      volume: null,
      side: BUY,
      price: 10000,
      ord_type: MARKET_BUY,
    };
    const { token, query } = up_getToken_params(body);
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      timeout: 10000,
      cache: "no-store",
    };
    const res = await fetch(
      `https://api.upbit.com/v1/orders?${query}`,
      options
    );
    const resData = await res.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.log("업비트 시장가 매수 에러", error);
  }
}

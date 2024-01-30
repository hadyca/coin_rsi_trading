import { up_getAuth_params } from "@/utils/upbitAuth";

export default async function up_marketBuy(market, balance) {
  const BUY = "bid"; //매수
  const BUY_PRICE = balance * 1; //가진 잔액 %로 매수 가능
  const MARKET_BUY = "price";
  try {
    const params = {
      market: market,
      side: BUY,
      price: BUY_PRICE,
      ord_type: MARKET_BUY,
    };
    const options = up_getAuth_params(params);
    const res = await fetch(
      `https://api.upbit.com/v1/orders/chance?market=KRW-BTC`,
      options
    );

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("업비트 시장가 매수 에러", error);
  }
}

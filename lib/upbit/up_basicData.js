import { up_getToken_params } from "@/utils/upbitToken";

export default async function up_getBasicData() {
  try {
    const params = {
      market: "KRW-BTC",
    };
    const { token } = up_getToken_params(params);

    const options = {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    };
    const res = await fetch(
      `https://api.upbit.com/v1/orders/chance?market=KRW-BTC`,
      options
    );

    const resData = await res.json();
    const {
      bid_fee: buy_fee,
      maker_ask_fee: sell_fee,
      bid_account: { balance: krw_balance },
      ask_account: { balance: btc_balance },
    } = resData;

    const basicData = {
      buy_fee,
      sell_fee,
      krw_balance,
      btc_balance,
    };
    return basicData;
  } catch (error) {
    console.log("업비트 기초 데이터 정보 fetch 에러", error);
  }
}

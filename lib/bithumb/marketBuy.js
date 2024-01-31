import bithumbHeader from "@/utils/bithumbHeader";

export default async function marketBuy() {
  const req_query = {
    endpoint: "/trade/market_buy",
    units: "0.0001",
    order_currency: "BTC",
    payment_currency: "KRW",
  };

  const options = {
    method: "POST",
    headers: bithumbHeader(req_query),
    body: new URLSearchParams(req_query),
  };
  try {
    const res = await fetch(
      `https://api.bithumb.com${req_query.endpoint}`,
      options
    );
    const resData = await res.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.log("빗썸 시장가 매수 fetch 에러", error);
  }
}

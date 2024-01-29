import bithumbHeader from "../../utils/bithumbHeader";

//빗썸 시장가 매수 주문
export default async function marketOrderBuyBs(symbol, volume) {
  try {
    const req_query = {
      endpoint: "/trade/market_buy",
      order_currency: symbol,
      payment_currency: "KRW",
      units: volume,
    };

    const options = {
      method: "POST",
      headers: bithumbHeader(req_query),
      body: req_query,
    };

    const res = await fetch(
      `https://api.bithumb.com${req_query.endpoint}`,
      options
    );
    console.log("빗썸 시장가 매수 성공!", res.data);
    return result.data;
  } catch (error) {
    console.log("빗썸 시장가 매수 에러", error);
  }
}

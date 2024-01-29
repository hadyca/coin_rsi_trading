import bithumbHeader from "../bithumbHeader";

//빗썸 시장가 매수 주문
export default async function getBalance(coinName) {
  try {
    const PAY_CURRENCY = "KRW";
    const req_query = {
      endpoint: "/info/account",
      order_currency: coinName,
      payment_currency: PAY_CURRENCY,
    };

    const options = {
      method: "POST",
      headers: bithumbHeader(req_query),
      body: JSON.stringify({
        order_currency: coinName,
        payment_currency: PAY_CURRENCY,
      }),
    };
    const res = await fetch(
      `https://api.bithumb.com${req_query.endpoint}`,
      options
    );

    const resData = await res.text();
    console.log(resData);
    return resData.data;
  } catch (error) {
    console.log("빗썸 주문가능수량 조회 에러", error);
  }
}

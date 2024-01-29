//원하는 코인에 대한 주문 가능 수량 조회 -> 매수할때 데이터로 쓰임

import { XCoinAPI } from "@/utils/xCoins";
import bithumbHeader from "../bithumbHeader";

//빗썸 시장가 매수 주문
export default async function getBalance(coinName) {
  const xcoinAPI = XCoinAPI();
  console.log(xcoinAPI);

  // console.log(xcoinAPI);
  // try {
  //   const PAY_CURRENCY = "KRW";
  //   const req_query = {
  //     endpoint: "/info/account",
  //     order_currency: coinName,
  //     payment_currency: PAY_CURRENCY,
  //   };
  //   const options = {
  //     method: "POST",
  //     headers: bithumbHeader(req_query),
  //     body: JSON.stringify(req_query),
  //   };
  //   const res = await fetch(
  //     `https://api.bithumb.com${req_query.endpoint}`,
  //     options
  //   );
  //   const resData = await res.json();
  //   console.log(resData.data);
  //   return resData.data;
  // } catch (error) {
  //   console.log("빗썸 주문가능수량 조회 에러", error);
  // }
}

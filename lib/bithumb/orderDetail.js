import bithumbHeader from "@/utils/bithumbHeader";

export default async function getOrderDetail(orderId, coinName) {
  console.log();
  const req_query = {
    endpoint: "/info/order_detail",
    order_id: orderId,
    order_currency: coinName,
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
    console.log(resData.data);
    return resData;
  } catch (error) {
    console.log("빗썸 거래 주문내역  fetch 에러", error);
  }
}

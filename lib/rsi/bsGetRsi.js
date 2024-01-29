import calculateRsi from "@/utils/calculateRsi";

export default async function bsGetRsi(coin_pay, interval) {
  const options = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  try {
    const res = await fetch(
      `https://api.bithumb.com/public/candlestick/${coin_pay}/${interval}`,
      options
    );
    const result = await res.json();

    const reveredResult = result.data.reverse();
    const values = reveredResult.slice(0, 200).reverse();
    const closingPriceArr = values.map((v) => parseInt(v[2]));
    const resultRsi = calculateRsi(closingPriceArr);
    return resultRsi;
  } catch (error) {
    console.log("RSI값 가져오기 에러", error);
  }
}

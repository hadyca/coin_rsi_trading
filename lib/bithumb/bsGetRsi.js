import calculateRsi from "@/utils/calculateRsi";

export default async function bsGetRsi(coin_pay, interval) {
  try {
    const res = await fetch(
      `https://api.bithumb.com/public/candlestick/${coin_pay}/${interval}`,
      { cache: "no-store" }
    );
    const result = await res.json();

    //가장 최근값을 배열 맨 앞으로 둠
    const reveredResult = result.data.reverse();

    //가장 최근값을 맨 뒤로 둠
    const values = reveredResult.slice(0, 5).reverse();

    //종가만 뽑아옴, 최종적 배열은, 종가만 뽑아내서 가장 최근값이 맨 뒤로감
    const closingPriceArr = values.map((v) => parseInt(v[2]));
    const resultRsi = calculateRsi(closingPriceArr);
    return resultRsi;
  } catch (error) {
    console.log("RSI값 가져오기 에러", error);
  }
}

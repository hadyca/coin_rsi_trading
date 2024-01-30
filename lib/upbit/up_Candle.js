export default async function up_getCandle(interval, market, count) {
  try {
    const res = await fetch(
      `https://api.upbit.com/v1/candles/${interval}?market=${market}&count=${count}`,
      { cache: "no-store" }
    );
    const resData = await res.json();
    //[과거...최신]순의 배열로 만들어줌
    const reverseResData = resData.reverse();
    return reverseResData;
  } catch (error) {
    console.log("업비트 캔들값 fetch 에러", error);
  }
}

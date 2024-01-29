export default async function getCandle() {
  try {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const res = await fetch(
      "https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=10",
      options
    );
    const data = res.json();
    console.log(data);
  } catch (error) {
    console.log("업비트 캔들값 가져오기 에러", error);
  }
}

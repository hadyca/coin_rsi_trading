import beforeRsi from "@/utils/beforeOneRsi";
import calculateRsi from "@/utils/calculationRsi";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
};

export async function getData() {
  try {
    const res = await fetch(
      "https://api.bithumb.com/public/candlestick/BTC_KRW/30m",
      options
    );
    const result = await res.json();
    const reveredResult = result.data.reverse();
    // const valuesForNowRsi = reveredResult.slice(0, 200);
    const values = reveredResult.slice(0, 200).reverse();
    const resultBeforeRsi = calculateRsi(values);
    console.log(resultBeforeRsi);
    return result;
  } catch (error) {
    console.log("캔슬스틱에러", error);
  }
}

// export async function testFunc() {
// const timestamp = 1706321132552;
// const date = new Date(timestamp);
// const koreanTime = date.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
// const year = date.getFullYear();
// const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고 두 자리로 표시
// const day = ("0" + date.getDate()).slice(-2); // 일을 두 자리로 표시
// const hours = ("0" + date.getHours()).slice(-2); // 시를 두 자리로 표시
// const minutes = ("0" + date.getMinutes()).slice(-2); // 분을 두 자리로 표시
// const seconds = ("0" + date.getSeconds()).slice(-2); // 초를 두 자리로 표시
// const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// console.log(koreanTime);
// getData();
// setInterval(getData, 2000);
// }

// export async function TestFunc() {
//   useEffect(() => {
//     getStick();
//     const intervalId = setInterval(getStick, 5000);
//     return () => clearInterval(intervalId);
//   }, []);
// }

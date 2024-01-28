import trading from "./trading";
import getRsi from "./rsi/getRsi";

export async function app() {
  //모든 함수 인자값에 사용되는 상수값, 향후 클라이언트단에서 값 받아옴
  const COIN_PAY = "BTC_KRW";
  const INTERVAL = "5m";
  const SET_ROW_RSI = 30;
  const SET_HIGH_RSI = 70;
  const COIN_NAME = "BTC";

  //rsi값 가져오기
  const rsiValue = await getRsi(COIN_PAY, INTERVAL);

  //가져온 rsi값으로 매매하기
  await trading(
    rsiValue.beforeRsi,
    rsiValue.nowRsi,
    SET_ROW_RSI,
    SET_HIGH_RSI,
    COIN_NAME
  );
}

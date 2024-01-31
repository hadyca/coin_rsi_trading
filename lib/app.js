import trading from "./bithumb/trading";
import calculateRsi from "@/utils/calculateRsi";
import up_getBasicData from "../temp/upbit_lib/up_basicData";
import up_marketBuy from "../temp/upbit_lib/up_marketBuy";
import up_getCandle from "../temp/upbit_lib/up_candle";
import up_getMyAccount from "../temp/upbit_lib/up_myAccount";
import getMyAccount from "./bithumb/myAccount";
import getCandle from "./bithumb/candle";
import getClosingPrice from "@/utils/reverse_closing";
import marketBuy from "./bithumb/marketBuy";

export async function app() {
  const bithumbUser = true;

  //빗썸유저 로직
  if (bithumbUser) {
    //모든 함수 인자값에 사용되는 상수값, 향후 클라이언트단에서 값 받아옴
    const COIN_PAY = "BTC_KRW";
    const INTERVAL = "5m";
    const SET_ROW_RSI = 30;
    const SET_HIGH_RSI = 70;
    const COIN_NAME = "BTC";

    // BTC에 대해 주문가능수량 가져오기
    // const availableBuyVolume = await getMyAccount(COIN_NAME);
    // console.log(availableBuyVolume);

    //candle값 가져오기
    // const candleData = await getCandle(COIN_PAY, INTERVAL);

    //200개 종가 배열 [과거->최신순]
    // const closingPriceArr = getClosingPrice(candleData);
    // const rsiData = calculateRsi(closingPriceArr);
    //시장가매수
    // 가져온 rsi값으로 매매하기
    await trading(
      rsiValue.beforeRsi,
      rsiValue.nowRsi,
      SET_ROW_RSI,
      SET_HIGH_RSI,
      COIN_NAME
    );
  }
}

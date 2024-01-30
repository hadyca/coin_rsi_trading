import trading from "./bithumb/trading";
import bsGetRsi from "./bithumb/bsGetRsi";
import calculateRsi from "@/utils/calculateRsi";
import up_getBasicData from "./upbit/up_basicData";
import up_marketBuy from "./upbit/up_marketBuy";
import up_getCandle from "./upbit/up_candle";
import up_getMyAccount from "./upbit/up_myAccount";

export async function app() {
  const upbitUser = true;
  //업비트유저 로직
  if (upbitUser) {
    //상수값 (나중에 별도 파일로 정리)
    const minsType = {
      "1min": "minutes/1",
      "3mins": "minutes/3",
      "5mins": "minutes/5",
      "10mins": "minutes/10",
      "15mins": "minutes/15",
      "30mins": "minutes/30",
      "60mins": "minutes/60",
      "240mins": "minutes/240",
    };
    const INTERVAL_MIN = minsType["30mins"];
    const INTERVAL_DAY = "days";
    const INTERVAL_WEEK = "weeks";
    const INTERVAL_MONTH = "months";
    const MARKET = "KRW-BTC";
    const COUNT = "200";
    //rsi값 가져오기
    const resultCandle = await up_getCandle(INTERVAL_MIN, MARKET, COUNT);
    const closingPriceArr = resultCandle.map((v) => v.trade_price);
    const resultRsi = calculateRsi(closingPriceArr);
    //나의 계좌 조회 (매수,매도 수수료 + 원화잔액 + btc잔량)
    const basicData = await up_getBasicData();
    console.log(basicData);
    //rsi조건에 맞으면 자동매수

    if (resultRsi.beforeRsi < 30 && resultRsi.nowRsi > 30) {
      //시장가매수해라(절대 지금 건들지마! 작동한다)
      // const result = await up_marketBuy(
      //   MARKET,
      //   basicData.krw_balance,
      //   basicData.buy_fee
      // );
      //그리고 바로 지정가매도(tobe)
    }
    if (resultRsi.beforeRsi < 70 && resultRsi.nowRsi > 70) {
      //시장가매수해라
      // const result = await up_marketBuy();
      //그리고 바로 지정가매도(tobe)
    }

    //빗썸유저 로직
    if (!upbitUser) {
      //모든 함수 인자값에 사용되는 상수값, 향후 클라이언트단에서 값 받아옴
      const COIN_PAY = "BTC_KRW";
      const INTERVAL = "5m";
      const SET_ROW_RSI = 30;
      const SET_HIGH_RSI = 70;
      const COIN_NAME = "BTC";

      //rsi값 가져오기
      const rsiValue = await bsGetRsi(COIN_PAY, INTERVAL);

      //가져온 rsi값으로 매매하기
      // await trading(
      //   rsiValue.beforeRsi,
      //   rsiValue.nowRsi,
      //   SET_ROW_RSI,
      //   SET_HIGH_RSI,
      //   COIN_NAME
      // );
    }
  }
}

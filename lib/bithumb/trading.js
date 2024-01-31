import MarketBuy from "./marketBuy";
import getMyAccount from "./myAccount";
import getMyBalance from "./myBalance";
import getOrderBook from "./askPrice";
import getAskPrice from "./askPrice";
import getOrderDetail from "./orderDetail";

export default async function trading(coinName, coin_pay) {
  // beforeRsi,
  // nowRsi,
  // setRowRsi,
  // setHighRsi,
  // coinName
  // if (beforeRsi < setRowRsi && nowRsi > setRowRsi) {

  // 매도1호가
  const askPrice = await getAskPrice(coinName, coin_pay);

  //내가 가진 현금
  const myCash = await getMyBalance(coinName);
  const intMyCash = Math.floor(myCash);

  // 현금 / 매수1호가 = 내가 살 수 있는 수량 (소수점 4자리), 현금 * %하여 수량 조절가능
  const percent = 0.1;
  const availableBuyVolume = (intMyCash * percent) / askPrice;
  const fourDecimalVolume = String(
    Math.floor(availableBuyVolume * 10000) / 10000
  );

  //OK: 자동 시장가 매수 (일단 매수 가능 수량 100%로 매수)
  // const orderId = await MarketBuy(fourDecimalVolume);

  // TO-BE: 주문내역 (내가 주문한거 오더id넣고 산 코인 1개당 단가, 갯수, 얼마주고 샀는지)
  // await getOrderDetail(orderId, coinName);
  //주문내역 보고 complete면 그 수량과 개당 단가 데이터를 아래 지정가 매도 데이터로 사용

  // TO-BE: 지정가 매도 (손익, 손절가 2개 모두 세팅필요)

  // }
  // if (beforeRsi < setHighRsi && nowRsi > setHighRsi) {
  // }
}

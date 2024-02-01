import MarketBuy from "./marketBuy";
import getMyBalance from "./myBalance";
import getAskPrice from "./askPrice";
import getOrderDetail from "./orderDetail";
import limitSell from "./limitSell";

export default async function trading({
  coinName,
  coin_pay,
  beforeRsi,
  nowRsi,
  setRowRsi,
  setHighRsi,
}) {
  console.log(
    `🚀 트레이딩 감시 중...직전 RSI:${beforeRsi}, 현재 RSI:${nowRsi}`
  );
  if (
    (beforeRsi < setRowRsi && nowRsi > setRowRsi) ||
    (beforeRsi < setHighRsi && nowRsi > setHighRsi)
  ) {
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

    //자동 시장가 매수 (일단 매수 가능 수량 100%로 매수)
    const marketBuyId = await MarketBuy(fourDecimalVolume);

    // 주문내역 (내가 주문한거 오더id넣고 산 코인 1개당 단가, 갯수, 얼마주고 샀는지)
    // const orderId = "C0101000001420278764";
    const orderDetail = await getOrderDetail(marketBuyId, coinName);

    //주문했던 수량
    const orderedVolume = orderDetail.contract[0].units;
    //주문했던 1개당 코인단가
    const orderedUnitPrice = orderDetail.contract[0].price;

    //매수가 대비 목표 수익률 및 수익목표액(개당 단가) 로직
    const PROFIT_PERCENT = 0.0005; //0.05%
    const targetSellPrice =
      orderedUnitPrice - orderedUnitPrice * PROFIT_PERCENT;

    // 지정가 매도 (익절)
    const limitSellId = await limitSell(
      coinName,
      orderedVolume,
      targetSellPrice
    );
    console.log("지정가 매도 ID : ", limitSellId);
    console.log("지정가 매도까지 진행된 현재RSI :", nowRsi);
    return limitSellId;
  }
  return;
}

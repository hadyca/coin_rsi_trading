import marketOrderBuyBs from "./bithumb/marketOrderBuyBs";
import getBalance from "./bithumb/Balance";

export default async function trading(
  beforeRsi,
  nowRsi,
  setRowRsi,
  setHighRsi,
  coinName
) {
  const balance = await getBalance(coinName);

  if (beforeRsi < setRowRsi && nowRsi > setRowRsi) {
    //매수 가능 수량 조회
    // const balance = await getBalance(coinName);
    // 일단 가능 전량으로 하고, 나중에 balance값 조정해서 비율로 할 수 있음
    //자동 시장가 매수
    // const result = await marketOrderBuyBs(coinName, "수량넣기,,");
    //매수할때는 시장가로 매수 및 바로 지정가로 매도(손익,손절 모두) 걸어두기
    //지정가 세팅할 때는 개인정보에서 본인 현금이랑 코인 수량 가지고와야함
  }
  if (beforeRsi < setHighRsi && nowRsi > setHighRsi) {
    const result = await marketOrderBuyBs();
  }
}

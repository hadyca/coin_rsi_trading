const crypto = require("crypto");

const apiKey = process.env.BITHUMB_OPEN_API_ACCESS_KEY; // 빗썸에서 발급받은 API 키
const apiSecret = process.env.BITHUMB_OPEN_API_SECRET_KEY; // 빗썸에서 발급받은 시크릿 키
const apiEndpoint = "/info/account"; // 실제 사용하는 API 엔드포인트에 맞게 수정

// 서명 생성
const nonce = Date.now();
const message = apiEndpoint + String(nonce);
const signature = crypto
  .createHmac("sha512", apiSecret)
  .update(message)
  .digest("hex");

// 헤더 생성
const headers = {
  "ACCESS-KEY": apiKey,
  "ACCESS-NONCE": String(nonce),
  "ACCESS-SIGN": signature,
};
// API 요청
const url = `https://api.bithumb.com${apiEndpoint}`;

fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify({
    order_currency: "BTC",
    payment_currency: "KRW",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("API 응답:", data);
  })
  .catch((error) => {
    console.error("API 요청 실패:", error);
  });

import Request from "request";
import CryptoJS from "crypto-js";
import { microtime, http_build_query, base64_encode, chr } from "./bsHeader";

export default class XCoinAPI {
  constructor(api_key, api_secret) {
    this.apiUrl = "https://api.bithumb.com";
    this.api_key = api_key;
    this.api_secret = api_secret;
  }
  wrappXCoinForm(endPoint, params) {
    const rgParams = {
      endPoint: endPoint,
    };
    if (params) {
      for (let o in params) {
        rgParams[o] = params[o];
      }
    }

    const api_host = this.apiUrl + endPoint;
    const httpHeaders = this._getHttpHeaders(
      endPoint,
      rgParams,
      this.api_key,
      this.api_secret
    );
    return { strHost: api_host, rgParams: rgParams, httpHeaders: httpHeaders };
  }
  xcoinApiCall(endPoint, params, callback) {
    const rgParams = {
      endPoint: endPoint,
    };

    if (params) {
      for (let o in params) {
        rgParams[o] = params[o];
      }
    }

    const api_host = this.apiUrl + endPoint;
    const httpHeaders = this._getHttpHeaders(
      endPoint,
      rgParams,
      this.api_key,
      this.api_secret
    );
    const rgResult = this.request(
      api_host,
      "POST",
      rgParams,
      httpHeaders,
      callback
    );
  }
  request(strHost, strMethod, rgParams, httpHeaders, callback) {
    let rgHeaders = {};
    if (httpHeaders) {
      rgHeaders = httpHeaders;
    }

    Request(
      {
        method: strMethod,
        uri: strHost,
        headers: rgHeaders,
        formData: rgParams,
      },
      function (error, response, rgResult) {
        if (error) {
          console.log(error);
          return;
        }

        callback(JSON.parse(rgResult));
      }
    );
  }
  _getHttpHeaders(endPoint, rgParams, api_key, api_secret) {
    const strData = http_build_query(rgParams);
    const nNonce = this.usecTime();
    return {
      "Api-Key": api_key,
      "Api-Sign": base64_encode(
        CryptoJS.HmacSHA512(
          endPoint + chr(0) + strData + chr(0) + nNonce,
          api_secret
        ).toString()
      ),
      "Api-Nonce": nNonce,
    };
  }
  usecTime() {
    let rgMicrotime = microtime().split(" "),
      usec = rgMicrotime[0],
      sec = rgMicrotime[1];

    usec = usec.substr(2, 3);
    return Number(String(sec) + String(usec));
  }
}

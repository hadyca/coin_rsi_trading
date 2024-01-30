import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import querystring from "querystring";

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;

export function up_getToken_noParams() {
  const payload = {
    access_key: access_key,
    nonce: v4(),
  };
  const token = jwt.sign(payload, secret_key);
  return token;
}

export function up_getToken_params(params) {
  const query = querystring.stringify(params);

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: v4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = jwt.sign(payload, secret_key);
  return { query, token };
}

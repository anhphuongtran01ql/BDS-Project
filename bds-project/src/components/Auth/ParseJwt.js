import { Buffer } from "buffer";

export default function ParseJwt(token) {
  if (token !== "undefined" || token !== null) {
    let base64Url = token?.split(".")[1];
    let base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
    let decodedData = {};

    if (base64 !== undefined) {
      decodedData = JSON.parse(
        Buffer.from(base64, "base64").toString("binary")
      );
    } else return undefined;

    return decodedData;
  }
}

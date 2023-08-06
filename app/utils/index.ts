import AWS from "aws-sdk";
import ENV from "../env";

export const S3_INSTANCE = new AWS.S3({
  accessKeyId: ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
});
export async function pesoAppGet(url: string) {
  const response = await fetch(`${ENV.PESO_APP_TEMP}${url}`, {
    method: "get",
  });
  return JSON.parse(await response.text());
}


export function generateId(length: number = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function parseLoungePostTitle(title: string = "") {
  title = title.replace(/[\\r\\n]/gm, "");
  title = title.substr(1);
  title = title.substr(0, title.length - 2);
  title = title.replace(/#\S+/g, "");
  title = title.trim();
  return title;
}

import AWS from "aws-sdk";
import ENV from "../env";
import Pusher from "pusher";
import { REGEX } from "../constants";

export const PUSHER_INSTANCE = new Pusher({
  appId: ENV.PUSHER_APP_ID,
  key: ENV.PUSHER_KEY,
  secret: ENV.PUSHER_SECRET,
  cluster: ENV.PUSHER_CLUSTER,
  useTLS: true,
});

export function triggerPush(batch: any[]) {
  PUSHER_INSTANCE.triggerBatch(batch);
}

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

export async function pesoAppPost(url: string, body: any) {
  const response = await fetch(`${ENV.PESO_APP_TEMP}${url}`, {
    body,
    method: "post",
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

export function youtubeParser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export function parseCredential(credential: string) {
  if (checkIfPhoneNumber(credential)) {
    if (credential.length == 12) {
      return credential.slice(2);
    }
    if (credential.length == 11) {
      return credential.slice(1);
    }
  }

  return credential;
}

export function checkIfPhoneNumber(credential: string): boolean {
  return REGEX.PHONENUMBER.test(credential);
}

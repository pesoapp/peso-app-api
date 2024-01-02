import AWS from "aws-sdk";
import ENV from "../env";
import Pusher from "pusher";
import { REGEX, SHIPPING_RATE, PAYMENT_METHOD } from "../constants";

export function getPaymentMethod(payment_method: any): any {
  const temp = Object.values(PAYMENT_METHOD).find(
    (e: any) => e.code == payment_method
  );
  return temp ? temp["name"] : "";
}

export function getShippingMethod(shipping_method: any): any {
  const temp = Object.values(SHIPPING_RATE).find(
    (e: any) => e.value == shipping_method
  );
  return temp ? temp["name"] : "";
}

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const PUSHER_INSTANCE = new Pusher({
  appId: ENV.PUSHER_APP_ID,
  key: ENV.PUSHER_KEY,
  secret: ENV.PUSHER_SECRET,
  cluster: ENV.PUSHER_CLUSTER,
  useTLS: true,
});

export function pTypeParser(type: number) {
  switch (type) {
    case 0:
      return "reg";
    case 1:
      return "cb";
    case 2:
      return "bg";
    case 3:
      return "ae";
  }
}

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
  // title = title.replace(/[\\r\\n]/gm, "");
  // title = title.substr(1);
  // title = title.substr(0, title.length - 2);
  // title = title.replace(/#\S+/g, "");
  // title = title.trim();
  console.log(JSON.parse(title));

  return JSON.parse(title);
}

export function youtubeParser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : "";
}

export function tiktokParser(url: string) {
  const regExp = /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm;
  const match = url.match(regExp);
  return match ? match[0].split("/")[5] : "";
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

export function getYtUrl(): string {
  return "https://www.googleapis.com/youtube/v3/";
}

export async function searchYoutube(
  query: string = "peso app",
  maxResults: number = 10
): Promise<any[]> {
  const response = await fetch(
    `${getYtUrl()}search?part=snippet&maxResults=${maxResults}&q=${query}&key=${
      ENV.YT_KEY
    }&type=video`
  );

  const parsed = await response.json();
  const items = parsed.items ?? [];

  return items;
}

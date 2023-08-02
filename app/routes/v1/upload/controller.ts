import { Request, Response } from "express";
import { S3_INSTANCE, generateId } from "../../../utils";
import ENV from "../../../env";
import fs from "fs";
import { readFile } from "node:fs/promises";

const addAuction = async (_req: Request, _res: Response) => {
  // AWS FILE UPLOAD
  // const name: string = generateId(20);
  // await S3_INSTANCE.upload({
  //   Bucket: ENV.AWS_BUCKET_NAME,
  //   Key: `auction/${name}`,
  //   Body: _req.file?.path || "",
  // }).promise();

  const image = new Blob([await readFile(_req.file?.path ?? "")]);
  let formData = new FormData();
  formData.set("imageMain", image, _req.file?.path ?? "");
  const resp = await fetch(
    `${ENV.PESO_APP_TEMP}auction.php?action=uploadAuctionImage`,
    {
      body: formData,
      method: "post",
    }
  );
  const path = JSON.parse(await resp.text()).path;

  await fs.unlink(_req.file?.path || "", () => {});

  _res.send({
    data: [{ path }],
    status: "success",
    message: "Upload Auction Image success",
  });
};

export { addAuction };

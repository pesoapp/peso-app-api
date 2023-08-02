import { Request, Response } from "express";
import { S3_INSTANCE, generateId } from "../../../utils";
import ENV from "../../../env";
import fs from "fs";

const addAuction = async (_req: Request, _res: Response) => {
  const name: string = generateId(20);
  await S3_INSTANCE.upload({
    Bucket: ENV.AWS_BUCKET_NAME,
    Key: name,
    Body: _req.file?.path || "",
  }).promise();

  await fs.unlink(_req.file?.path || "", () => {});

  _res.send({
    data: [{ path: name }],
    status: "success",
    message: "Upload Auction Image success",
  });
};

export { addAuction };

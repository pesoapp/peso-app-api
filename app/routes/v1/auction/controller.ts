import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import condition from "../condition/service";
import ocProductBrand from "../ocProductBrand/service";
import ocAddress from "../ocProductBrand/service";
import auctionSideImages from "../auctionSideImages/service";
import auctionQuestion from "../auctionQuestion/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Auction failed",
    });
    return;
  }

  const ocCustomerTemp = await ocCustomer.getById(data?.customer_id || 0);
  const conditionTemp = await condition.getById(data?.condition_id || 0);
  const ocProductBrandTemp = await ocProductBrand.getById(data?.brand_id || 0);
  const ocAddressTemp = await ocAddress.getById(data?.brand_id || 0);
  const auctionSideImagesTemp = await auctionSideImages.getByAuction(
    data?.id || 0
  );
  const auctionQuestionTemp = await auctionQuestion.getByAuction(data?.id || 0);

  _res.send({
    data: [
      {
        customer: ocCustomerTemp,
        brand: ocProductBrandTemp,
        condition: conditionTemp,
        address: ocAddressTemp,
        side_images: auctionSideImagesTemp,
        questions: auctionQuestionTemp,
        ...data,
      },
    ],
    status: "success",
    message: "Get Auction success",
  });
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { side_images, ...res } = _req.body;
  const data = await service.add(res);
  const temp = await auctionSideImages.addMany(data.id ?? 0, side_images);
  _res.send({
    data: [{ data, side_images: temp }],
    status: "success",
    message: "Add Auction success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const data = await service.removeOne(Number(id));
  _res.send({
    data: [data],
    status: "success",
    message: "Add Auction success",
  });
};

export { getAll, getById, add, update, removeOne };

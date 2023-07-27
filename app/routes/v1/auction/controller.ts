import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import condition from "../condition/service";
import ocProductBrand from "../ocProductBrand/service";
import ocAddress from "../ocProductBrand/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 5, page = 1 } = _req.query;
  const data = await service.getAll({ limit, page });
  _res.send({
    data,
    status: "success",
    message: "Get Auction success",
  });
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  const ocCustomerTemp = await ocCustomer.getById(data?.customer_id || 0);
  const conditionTemp = await condition.getById(data?.condition_id || 0);
  const ocProductBrandTemp = await ocProductBrand.getById(data?.brand_id || 0);
  const ocAddressTemp = await ocAddress.getById(data?.brand_id || 0);

  _res.send({
    data: [
      {
        customer: ocCustomerTemp,
        brand: ocProductBrandTemp,
        condition: conditionTemp,
        address: ocAddressTemp,
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

const removeOne = async (_req: Request, _res: Response) => {};

export { getAll, getById, add, update, removeOne };

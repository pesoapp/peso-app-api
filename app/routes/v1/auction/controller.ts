import service from "./service";
import { Request, Response } from "express";
import ocCustomer from "../ocCustomer/service";
import condition from "../condition/service";
import ocProductBrand from "../ocProductBrand/service";
import ocAddress from "../ocAddress/service";
import auctionSideImages from "../auctionSideImages/service";
import auctionQuestion from "../auctionQuestion/service";
import auctionBid from "../auctionBid/service";
import { shuffle } from "../../../utils";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 1000, page = 1, customer_id = 0, search = "" } = _req.query;

  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({
      limit: Number(limit),
      page: Number(page),
      customer_id: customer_id.toString(),
      search: search.toString(),
    });

    response = {
      data: shuffle(data),
      status: "success",
      message: "Get Auction success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Auction failed",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
};

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction failed",
  };
  try {
    const data = await service.getById(Number(id));

    if (!data) {
      _res.send(response);
      return;
    }

    const ocCustomerTemp = await ocCustomer.getById(data?.customer_id || 0);
    const conditionTemp = await condition.getById(data?.condition_id || 0);
    const ocProductBrandTemp = await ocProductBrand.getById(
      data?.brand_id || 0
    );
    const ocAddressTemp = await ocAddress.getById(data?.brand_id || 0);

    const auctionSideImagesTemp = await auctionSideImages.getByAuction(
      data?.id || 0
    );
    const auctionQuestionTemp = await auctionQuestion.getByAuction(
      data?.id || 0
    );

    const ocCustomersTemp =
      (await ocCustomer.getManyByCustomer(
        auctionQuestionTemp.map((e: any) => e.customer_id)
      )) ?? [];

    auctionQuestionTemp.map((e: any) => {
      e.customer = ocCustomersTemp.find(
        (customer: any) => (customer.customer_id = e.customer_id)
      );
      return e;
    });

    const auctionBidTemp = await auctionBid.getByAuction(data?.id || 0);
    const temp =
      (await ocCustomer.getManyByCustomer(
        auctionBidTemp.map((e: any) => e.customer_id)
      )) ?? [];

    auctionBidTemp.map((e: any) => {
      e.customer = temp.find(
        (customer: any) => (customer.customer_id = e.customer_id)
      );
      return e;
    });

    response = {
      data: [
        {
          customer: ocCustomerTemp,
          brand: ocProductBrandTemp,
          condition: conditionTemp,
          address: ocAddressTemp,
          side_images: auctionSideImagesTemp,
          questions: auctionQuestionTemp,
          bids: auctionBidTemp,
          ...data,
        },
      ],
      status: "success",
      message: "Get Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { side_images, ...res } = _req.body;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Auction failed",
  };

  try {
    const data = await service.add(res);
    const temp = await auctionSideImages.addMany(data.id ?? 0, side_images);
    response = {
      data: [{ data, side_images: temp }],
      status: "success",
      message: "Add Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: _.toString(),
      message: "Get Auction failed",
    };
  }

  _res.send(response);
};

const update = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  const { side_images, ...res } = _req.body;
  let response: any = {
    data: [],
    status: "fail",
    message: "Edit Auction fail",
  };

  try {
    const data = await service.update(Number(id), res);
    const temp = await auctionSideImages.addMany(data.id ?? 0, side_images);

    response = {
      data: [{ data, side_images: temp }],
      status: "success",
      message: "Edit Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const post = async (_req: Request, _res: Response) => {
  const { id } = _req.params;

  let response: any = {
    data: [],
    status: "fail",
    message: "Post Auction fail",
  };

  try {
    const data = await service.post(Number(id));
    response = {
      data: [data],
      status: "success",
      message: "Post Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;

  let response: any = {
    data: [],
    status: "fail",
    message: "Remove Auction fail",
  };

  try {
    const data = await service.removeOne(Number(id));
    response = {
      data: [data],
      status: "success",
      message: "Remove Auction success",
    };
  } catch (_: any) {
    response = {
      data: [],
      status: "fail",
      message: _.toString(),
    };
  }

  _res.send(response);
};

export { post, getAll, getById, add, update, removeOne };

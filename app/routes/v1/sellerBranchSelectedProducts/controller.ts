import service from "./service";
import { Request, Response } from "express";
import ocSeller from "../ocSeller/service";
import sellerBranch from "../sellerBranch/service";
import ocProductBrand from "../ocProductBrand/service";
// TODO: Add status query
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
  });
  _res.send({
    data,
    status: "success",
    message: "Get Seller Branch Selected Products success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
};

const getManyByProduct = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const { store_id = null } = _req.params;
  const data = await service.getStoreList(
    store_id ? Number(store_id) : null,
    Number(id)
  );

  _res.send({
    data,
    status: "success",
    message: "Get Seller Branch Selected Products success",
  });
};

// const getManyByProduct = async (_req: Request, _res: Response) => {
//   const { id = 0 } = _req.params;
//   const data = await service.getManyByProduct(Number(id));

//   const ocSellerTemp = await ocSeller.getManyBySeller(
//     data.map((e: any) => e.seller_id)
//   );

//   const sellerBranchTemp = await sellerBranch.getManyById(
//     data.map((e: any) => e.branch_id)
//   );

//   const ocProductBrandTemp = await ocProductBrand.getManyById(
//     data.map((e: any) => e.brand_id)
//   );

//   data.map((e: any) => {
//     e.seller = ocSellerTemp.find((seller: any) => {
//       return seller.seller_id == e.seller_id;
//     });

//     e.branch = sellerBranchTemp.find((branch: any) => {
//       return branch.id == e.branch_id;
//     });

//     e.brand = ocProductBrandTemp.find((brand: any) => {
//       return brand.id == e.brand_id;
//     });
//     return e;
//   });

//   // "SELECT os.seller_id,sb.b_name as shop_name,sbsp.branch_id,
//   //                 sbsp.brand_id,opd.name,sbsp.quantity as qty,
//   //                 sb.branch_logo as image, sb.live_demo_status
//   //             FROM seller_branch_selected_products sbsp
//   //             INNER JOIN  oc_seller os
//   //                 ON sbsp.seller_id=os.seller_id
//   //             INNER JOIN  seller_branch sb
//   //                 ON sbsp.branch_id=sb.id
//   //             INNER JOIN oc_product_brand  opd
//   //                 ON opd.id=sbsp.brand_id
//   //             WHERE sbsp.quantity!=0 AND sbsp.product_id=:product_id
//   //             order by sbsp.quantity desc "
//   _res.send({
//     data,
//     status: "success",
//     message: "Get Seller Branch Selected Products success",
//   });
// };

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Seller Branch Selected Products failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Seller Branch Selected Products success",
  });
};
const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Seller Branch Selected Products success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Seller Branch Selected Products success",
  });
};

export { getManyByProduct, getAll, getById, add, update, removeOne };

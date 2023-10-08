import service from "./service";
import { Request, Response } from "express";
import ocProductImage from "../ocProductImage/service";
import ocProductDescription from "../ocProductDescription/service";
import sellerBranchSelectedProducts from "../sellerBranchSelectedProducts/service";
import ocReview from "../ocReview/service";

const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Product failed",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  };

  try {
    const data = await service.getAll({});
    response = {
      data: data,
      status: "success",
      message: "Get Oc Product success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Product failed",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
};

// TODO:
// return array(
//               'hasShipMethod' => true,
//               'productId' => $data['product_id'],
//               'name' => utf8_encode($data['name']),
//               'price' => round($data['price'], 2),
//               'oldPrice' => $oldPrice,
//               'newPrice' => $newPrice,
//               'thumb' => $img,
//               'image' => $this->get_product_images($product_id, $img),
//               'rating' => $this->getProductRating($product_id, $storeId, 'all'),
//               'quantity' => $data['quantity'],
//               'tag' => $data['tag'],
//               'viewed' => $data['viewed'],
//               'description' => html_entity_decode($data['description']),
//               'discount' => [],
//               'reviews' => $this->getProductReviews($data['product_id']),
//               'warehouse' => [],
//               'freebie' => [],
//               'pricePromoText' => $priceDeduct,
//               'detail' => array(
//                   array(
//                       'label' => 'tags',
//                       'value' => $data['tag']
//                   ),
//                   array(
//                       'label' => 'model',
//                       'value' => html_entity_decode($data['model']),
//                   ),
//                   array(
//                       'label' => 'category',
//                       'value' => html_entity_decode($product->product_category_names($data['product_id']))
//                   ),
//               ),
//               'attribute' => $this->get_attribute($product_id),
//               'storeList' => $storeList,
//               'brand' => $this->brandName($product_id),
//               'category' => html_entity_decode($product->product_category_names($data['product_id']))
//           );

// 1. Get product views
// 2. Upsert product view
// 3. Get localProduct $product_id, $storeId
// 4. Generate review
// 5. Get Store List
const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const { store_id = null } = _req.params;

  // 3. Get localProduct $product_id, $storeId
  const data = (await service.getLocalProductById(Number(id)))[0];

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Oc Product failed",
    });
    return;
  }
  // 4. Generate review

  // 3. Get localProduct $product_id, $storeId
  const stores = await sellerBranchSelectedProducts.getStoreList(
    store_id ? Number(store_id) : null,
    Number(id)
  );

  _res.send({
    data: [{ ...data, storeList: stores }],
    status: "success",
    message: "Get Oc Product success",
  });
};

// 4. Get chinabrands
// 5. Get banggood
// 6. Get aliexpress

// const getById = async (_req: Request, _res: Response) => {
//   const { id = 0 } = _req.params;
//   const data = await service.getById(Number(id));

//   if (!data) {
//     _res.send({
//       data: [],
//       status: "fail",
//       message: "Get Oc Product failed",
//     });
//     return;
//   }

//   const ocProductImageTemp = await ocProductImage.getByProduct(
//     data?.product_id ?? 0
//   );

//   const ocProductDescriptionTemp = await ocProductDescription.getByProduct(
//     data?.product_id ?? 0
//   );

//   const ocReviewTemp = await ocReview.getByProduct({
//     product_id: data?.product_id ?? 0,
//     limit: 3,
//     page: 1,
//   });

//   _res.send({
//     data: [
//       {
//         ...data,
//         sideImages: ocProductImageTemp,
//         reviews: ocReviewTemp,
//         ...ocProductDescriptionTemp[0],
//       },
//     ],
//     status: "success",
//     message: "Get Oc Product success",
//   });
// };

const add = async (_req: Request<any, any, any>, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Product success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Product success",
  });
};

export { getAll, getById, add, update, removeOne };

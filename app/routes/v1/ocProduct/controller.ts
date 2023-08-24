import service from "./service";
import { Request, Response } from "express";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;

  const data = await service.getAll({
    limit: Number(limit),
    page: Number(page),
  });

  _res.send({
    data,
    status: "success",
    message: "Get Oc Product success",
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
    },
  });
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

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Oc Product failed",
    });
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Product success",
  });
};

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

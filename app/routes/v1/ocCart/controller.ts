import service from "./service";

import { Request, Response } from "express";
import { pTypeParser } from "../../../utils";
const getAll = async (_req: Request, _res: Response) => {
  const { limit = 10, page = 1 } = _req.query;
  let response: any = {
    data: [],
    status: "fail",
    message: "Get Oc Cart failed",
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
      message: "Get Oc Cart success",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (_) {
    response = {
      data: [],
      status: "fail",
      message: "Get Oc Cart failed",
      meta: {
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  }

  _res.send(response);
};

// TODO: add bg products
// TODO: product_category_names in reg
// TODO: brandName in reg
// TODO: getShippingAmoutByProduct in reg
const getManyByCustomer = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;

  // 1. getManyByCustomer
  const data = await service.getManyByCustomer(Number(id));

  // 2. Update ocCart quantity to 1 from getManyByCustomer when quantity is 0
  await service.clearQuantity(Number(id));

  // 3. Parse p type
  const parsedPType = data.map((e: any) => {
    e.type = e.p_type;
    e.p_type = pTypeParser(e.p_type);
    return e;
  });

  // 4. Get single products (oc product and oc product descriptionn)
  const productDetails = await service.getByProduct(
    parsedPType.map((e: any) => e.product_id),
    []
  );

  const productDetailsTemp = productDetails.map((product: any) => {
    const tempParsed = parsedPType.find(
      (e: any) => e.product_id == product.product_id
    );
    if (!tempParsed) return {};
    return { ...tempParsed, product };
  });

  // 5. Parse old price and price

  // 6. Add product quantity branch from seller_branch_selected_products as productQuantity
  const productQuantities = await service.getQuantityByProduct(
    [...new Set(productDetailsTemp.map((e: any) => e.seller_id))],
    [...new Set(productDetailsTemp.map((e: any) => e.product.product_id))],
    [...new Set(productDetailsTemp.map((e: any) => e.branch_id))]
  );

  const productQuantitiesTemp = productDetailsTemp.map((e: any) => {
    const temp = productQuantities.find((quantity: any) => {
      return (
        quantity.seller_id == e.seller_id &&
        quantity.branch_id == e.branch_id &&
        quantity.product_id == e.product.product_id
      );
    });
    return {
      ...e,
      productQuantity: temp.quantity,
      quantity: temp.quantity > 0 ? e.quantity : 0,
    };
  });

  // 7. Get Branch and Seller names
  const branchNames = await service.getManySellerBranchById([
    ...new Set(productQuantitiesTemp.map((e: any) => e.branch_id)),
  ]);

  const sellerNames = await service.getManySellerNamesById([
    ...new Set(productQuantitiesTemp.map((e: any) => e.seller_id)),
  ]);

  const parsedSellerNames = productQuantitiesTemp.map((e: any) => {
    const tempBranch =
      branchNames.find((branch: any) => branch.id == e.branch_id) ?? {};

    const tempSeller = sellerNames.find(
      (seller: any) => seller.seller_id == e.seller_id
    );

    return {
      ...e,
      branchName: tempBranch.b_name ?? tempSeller.shop_name,
      seller: tempSeller,
    };
  });

  // 8. Get Product discounts
  const discounts = await service.getManyProductDiscountById([
    ...new Set(parsedSellerNames.map((e: any) => e.product_id)),
  ]);

  const discountsTemp = parsedSellerNames.map((e: any) => {
    e.discount = discounts.find(
      (discount: any) => e.product_id == discount.product_id
    );
    return e;
  });

  _res.send({
    data: discountsTemp,
    status: "success",
    message: "Get Oc Cart success",
  });

  // 5. parse product by p_type
  // const temp = productDetails.map((e: any) => {
  //   return e
  // })

  // const temp: any[] = data.map(async (e: any) => {

  //   const type = pTypeParser(e.p_type);
  //   const productInfo = (await service.getByProduct(Number(e.product_id), pTypeParser(e.p_type)))[0]

  //   if (productInfo) {
  //     if (productInfo.type == "reg") {
  //       const special = false
  //       let price = e['price'];
  //       let oldPrice = productInfo['price'];

  //       if (e['price'] != 0 || e['price'] != null) {
  //         if (e['price'] != productInfo['price']) {
  //           price = e['price'];
  //           oldPrice = productInfo['price'];
  //         } else {
  //           price = productInfo['price'];
  //           oldPrice = 0;
  //         }
  //       } else {
  //         price = productInfo['price'];
  //         oldPrice = 0;
  //       }
  //       const productQuantity = (await sellerBranchSelectedProducts.getBranchQuantity(e['seller_id'], productInfo['product_id'], e['branch_id']))[0].quantity ?? 0;
  //       const quantity = productQuantity > 0 ? e['quantity'] : 0;
  //       const branchName = (await sellerBranch.getNameById(e['branch_id']))[0] ?? "";
  //       const seller = (await ocSeller.getById(e['seller_id']))[0] ?? {};
  //       // 'id' => (int)$cart['cart_id'],
  //       //   'productId' => $product_info['product_id'],
  //       //     'branchId' => $cart['branch_id'],
  //       //       'name' => utf8_encode($product_info['name']),
  //       //         'quantity' => $quantity,
  //       //           'productQuantity' => $product_quantity,
  //       //             'price' => (float) $price,
  //       //               'oldPrice' => (float) $oldPrice,
  //       //                 'total' => ($price * $quantity),
  //       //                   'thumb' => $product_info['thumb'],
  //       //                     'special' => $special,
  //       //                       'discount' => $this -> cart_discounts($cart['product_id']),
  //       //                         'type' => $cart['p_type'],
  //       //                           'typeCode' => $product_info['type'],
  //       //                             'warehouse' => [],
  //       //                               'freebies' => $cart['freebies'],
  //       //                                 'branchName' => $branchName !== '' ? $branchName : $seller['shopName'],
  //       //                                   'seller' => $seller,
  //       //                                     'category' => $product -> product_category_names($product_info['product_id']),
  //       //                                       'brand' => $product -> brandName($product_info['product_id']),
  //       //                                         'shippingValue' => $product -> getShippingAmoutByProduct($product_info['product_id'])
  //       return {
  //         id: e['cart_id'],
  //         productId: productInfo['product_id'],
  //         branchId: productQuantity,
  //         name: productInfo['name'],
  //         quantity: e['cart_id'],
  //         productQuantity: productQuantity,
  //         price: price,
  //         oldPrice: oldPrice,
  //         total: price * quantity,
  //         thumb: productInfo['thumb'],
  //         special: special,
  //         discount: e['cart_id'],
  //         type: e['cart_id'],
  //         typeCode: e['cart_id'],
  //         warehouse: e['cart_id'],
  //         freebies: e['cart_id'],
  //         branchName: e['cart_id'],
  //       }
  //     }
  //   }

  //   return {}
  // })

  // console.log(await Promise.all(temp));

  // const products = await Promise.all(data.map(async (e: any) => {
  //   return (await service.getByProduct(Number(e.product_id), pTypeParser(e.p_type)))[0]
  // }))

  // products.map((e: any) => {
  //   if (e.type == 'reg' ){
  //     e.special = false;
  //     data
  //   }
  //   return e;
  // })

  // console.log(products);
};

// const getManyByCustomer = async (_req: Request, _res: Response) => {
//   const { id = 0 } = _req.params;
//   const data = await service.getManyByCustomer(Number(id));
//   const ocSellerTemp = await ocSeller.getManyBySeller(
//     data.map((e: any) => e.seller_id)
//   );

//   const ocProductTemp = await ocProduct.getManyById(
//     data.map((e: any) => e.product_id)
//   );

//   const bgProductTemp = await bgProduct.getManyByProducts(
//     ocProductTemp.map((e: any) => e.product_id)
//   );

//   ocProductTemp.map((e: any) => {
//     e.bg = bgProductTemp.find((bg: any) => bg.product_id == e.product_id) ?? {};
//     return e;
//   });

//   data.map((e: any) => {
//     e.seller =
//       ocSellerTemp.find((seller: any) => seller.seller_id == e.seller_id) ??
//       null;

//     e.product =
//       ocProductTemp.find(
//         (product: any) => product.product_id == e.product_id
//       ) ?? null;

//     if (e.product == null || e.seller == null) {
//       return null;
//     }

//     return e;
//   });

//   _res.send({
//     data,
//     status: "success",
//     message: "Get Oc Cart success",
//   });
// };

const getById = async (_req: Request, _res: Response) => {
  const { id = 0 } = _req.params;
  const data = await service.getById(Number(id));

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get Oc Cart failed",
    });
    return;
  }

  _res.send({
    data: [data],
    status: "success",
    message: "Get Oc Cart success",
  });
};

// body should have selected product
const add = async (_req: Request<any, any, any>, _res: Response) => {
  const { customer_id = 0, product_id = 0, p_type = 0 } = _req.body;

  // $s->bindValue(':customer_id', $customer_id);
  // $s->bindValue(':seller_id', $selectedProduct->sellerId);
  // $s->bindValue(':freebies', $selectedProduct->freebies);
  // $s->bindValue(':price', $selectedProduct->price);
  // $s->bindValue(':discount_details', $selectedProduct->discountDetails);
  // $s->bindValue(':product_id', $product_id);
  // $s->bindValue(':quantity', $selectedProduct->quantity);
  // $s->bindValue(':branch_id', $selectedProduct->branchId);
  // $s->bindValue(':deduction_id', $selectedProduct->deductionId);
  // $s->bindValue(':p_type', $p_type);
  // {
  //   sellerId: "",
  //   freebies: "",
  //   price: "",
  //   discountDetails: "",
  //   quantity: "",
  //   branchId: "",
  //   deductionId: "",
  // }
  // check product from cart
  const product = await service.checkProductFromCart(
    Number(customer_id),
    Number(product_id),
    Number(p_type)
  );

  if (product.length != 0) {
    const data = await service.add({
      customer_id: Number(customer_id),
      p_type: Number(p_type),
    });
  }

  // check cart quantity
  // upsert oc cart
  _res.send({
    data: [],
    status: "success",
    message: "Add Oc Cart success",
  });
};

const update = async (_req: Request, _res: Response) => {};

const removeOne = async (_req: Request, _res: Response) => {
  const { id } = _req.params;
  _res.send({
    data: [],
    status: "success",
    message: "Remove Oc Cart success",
  });
};

export { getManyByCustomer, getAll, getById, add, update, removeOne };

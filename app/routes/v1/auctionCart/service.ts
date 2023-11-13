import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;

  return await prisma.auction_cart.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getById = async (id: number) => {
  return await prisma.auction_cart.findFirst({
    where: {
      id,
    },
  });
};

const getManyById = async (ids: any[]) => {
  return await prisma.auction_cart.findMany({
    where: {
      id: { in: ids.map((e: any) => Number(e)) },
    },
  });
};

const getByCustomer = async (customer_id: number) => {
  return await prisma.auction_cart.findMany({
    where: {
      customer_id,
    },
  });
};

const getByAuctionPriceCustomer = async (
  auction_id: number,
  customer_id: number,
  price: number
) => {
  return await prisma.auction_cart.findFirst({
    where: {
      customer_id,
      auction_id,
      price,
    },
  });
};

const checkIfCartExist = async (body: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * from auction_cart where auction_id =" +
      body.auction_id +
      " and price=" +
      body.price +
      " and customer_id=" +
      body.customer_id +
      " limit 1"
  );
};

const getMaxQuantityByAuctionId = async (auction_id: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT quantity from auction where id =" + auction_id + ""
  );
};

function getDate(date: any) {
  const temp = new Date(date);
  return `${temp.getFullYear()}-${temp.getUTCMonth()}-${temp.getDay()} ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}.000`;
}

const updateCartExist = async (body: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE auction_cart set quantity=IF(quantity + 1 > " +
      body.max +
      "," +
      body.max +
      ",quantity + 1), due = '" +
      getDate(body.due) +
      "' where id=" +
      body.id +
      ""
  );
};

const add = async (_body: any) => {
  return await prisma.auction_cart.create({
    data: {
      auction_id: _body.auction_id,
      auctioner_id: _body.auctioner_id,
      price: _body.price,
      customer_id: _body.customer_id,
      date_added: new Date(),
      quantity: 1,
      due: new Date(_body.due),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const updateQuantity = async (id: any, _body: any) => {
  return await prisma.auction_cart.update({
    where: {
      id,
    },
    data: {
      quantity: _body.quantity,
    },
  });
};

const removeOne = async (id: number) => {};

export default {
  getManyById,
  updateQuantity,
  getByAuctionPriceCustomer,
  getByCustomer,
  getAll,
  add,
  getMaxQuantityByAuctionId,
  checkIfCartExist,
  updateCartExist,
  update,
  removeOne,
  getById,
};

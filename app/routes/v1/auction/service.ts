import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction.findMany({
    include: {
      condition: true,
    },
    where: {
      deleted_at: null,
    },
  });
};

const getById = async (id: number) => {
  return await prisma.auction.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction.create({
    data: {
      name: _body.name,
      price: _body.price,
      main_image: _body.main_image,
      sold: false,
      buy_price: _body.buy_price,
      condition_id: _body.condition_id,
      model: _body.model,
      days_to_auction: _body.days_to_auction,
      brand_id: _body.brand_id,
      category_id: _body.category_id,
      description: _body.description,
      created_At: new Date(),
      updated_At: new Date(),
      customer_id: _body.customer_id,
      reason_of_selling: _body.reason_of_selling,
      issue: _body.issue,
      warranty: _body.warranty,
      freebies: _body.freebies,
      owner_history: _body.owner_history,
      inclusions: _body.inclusions,
      tags: _body.tags,
      delivery_charge_id: _body.delivery_charge_id,
      quantity: _body.quantity,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {
  return await prisma.auction.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

export default { getAll, add, update, removeOne, getById };

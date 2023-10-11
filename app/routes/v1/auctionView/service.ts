import { prisma } from "../../../db";

const get = async (query: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * from auction_view WHERE customer_id = " +
      query.customer_id +
      " and auction_id= " +
      query.customer_id +
      ""
  );
};

const incrementView = async (body: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "UPDATE auction_view SET `total_view` =`total_view`+ 1 WHERE customer_id = " +
      body.customer_id +
      " and auction_id= " +
      body.auction_id +
      ""
  );
};

const add = async (body: any) => {
  return await prisma.auction_view.create({
    data: {
      auction_id: body.auction_id,
      customer_id: body.customer_id,
      total_view: 1,
    },
  });
};

const getByAuction = async (auction_id: number) => {
  return await prisma.auction_view.findMany({
    where: {
      auction_id,
    },
  });
};

export default { get, incrementView, add, getByAuction };

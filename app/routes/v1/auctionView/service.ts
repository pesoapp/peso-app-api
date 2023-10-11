import { prisma } from "../../../db";

const getByAuction = async (auction_id: number) => {
  return await prisma.auction_view.findMany({
    where: {
      auction_id,
    },
  });
};

export default { getByAuction };

import { prisma } from "../../../db";

const getManyByPost = async (id: number) => {
  return await prisma.lounge_post_views.findMany({
    where: {
      post_id: id,
    },
  });
};

export default {
  getManyByPost,
};

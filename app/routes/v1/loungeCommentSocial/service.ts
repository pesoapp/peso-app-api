import { prisma } from "../../../db";

const getOne = async (_query: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM lounge_comment_social WHERE customer_id=" +
      _query.customer_id +
      " " +
      "AND comment_id=" +
      _query.comment_id +
      " " +
      ";"
  );
};

const getManyByIds = async (customer_ids: any[], comment_ids: any[]) => {
  if (customer_ids.length == 0 || comment_ids.length == 0) return [];

  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM lounge_comment_social WHERE customer_id IN (" +
      customer_ids +
      ") " +
      "AND comment_id IN (" +
      comment_ids +
      ");"
  );
};

const add = async (_body: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "INSERT INTO  lounge_comment_social SET comment_id=" +
      _body.comment_id +
      ",`like`=1,customer_id=" +
      _body.customer_id +
      ""
  );
};

const removeOne = async (_body: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "DELETE FROM lounge_comment_social where comment_id=" +
      _body.comment_id +
      " and customer_id=" +
      _body.customer_id +
      " limit 1"
  );
};

export default { getManyByIds, getOne, add, removeOne };

import { prisma } from "../../../db";

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

export default { add, removeOne };

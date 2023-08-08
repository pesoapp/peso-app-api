import { prisma } from "../../../db";

const getAllByCustomer = async (customer_id: number) => {
  const result = await prisma.$queryRawUnsafe<any[]>(
    " (SELECT LEFT(message,25) as message,`timestamp`,'' as picture,'admin' as type,'PESO App' as name,0 as id,receiver,`read` FROM oc_message_inbox_ca WHERE receiver='" +
      customer_id +
      "' OR sender ='" +
      customer_id +
      "' ORDER BY TIMESTAMP desc limit 1 ) UNION ALL(SELECT LEFT(message,25),`timestamp`,os.image,'store',os.shop_name,os.seller_id,receiver,`read` FROM oc_message_inbox omi LEFT JOIN oc_seller os ON omi.seller_id=os.seller_id WHERE omi.id IN (SELECT MAX(id) FROM oc_message_inbox WHERE receiver='" +
      customer_id +
      "' OR sender = '" +
      customer_id +
      "' GROUP BY seller_id)  ORDER BY TIMESTAMP DESC) UNION ALL(SELECT LEFT(message,25),am.`date_added`,oc.picture,'customer',concat(oc.firstname,' ',oc.lastname),oc.customer_id,receiver_id,`read` FROM auctioner_message am LEFT JOIN oc_customer oc ON (IF(sender_id='" +
      customer_id +
      "',am.receiver_id,am.sender_id)=customer_id ) WHERE   am.id IN(SELECT MAX(id) FROM auctioner_message WHERE sender_id = '" +
      customer_id +
      "' OR receiver_id='" +
      customer_id +
      "' GROUP BY chat_no)) order by timestamp desc"
  );
  return result;
};

const getById = async (id: number) => {};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getById, getAllByCustomer, add, update, removeOne };

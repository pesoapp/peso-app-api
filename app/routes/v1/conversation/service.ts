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

const getConversation = async (customer_id: number, id: number) => {
  const result = await prisma.$queryRawUnsafe<any[]>(
    "SELECT am.receiver_id,am.message,am.date_added,oc.picture,sms_type,a.main_image as item_picture,call_status,call_duration,a.name,am.auction_id as item_id,call_id FROM auctioner_message am LEFT JOIN oc_customer oc ON am.sender_id=oc.customer_id LEFT JOIN auction a on am.auction_id=a.id WHERE am.sender_id=" +
      customer_id +
      " AND receiver_id=" +
      id +
      " OR am.sender_id=" +
      id +
      " AND receiver_id=" +
      customer_id +
      " ORDER BY am.date_added desc"
  );
  return result;
};

const readMessage = async (
  table = "",
  sender_column = "",
  receiver_column = "",
  sender_id = 0,
  receiver_id = 0
) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE " +
      table +
      " SET `read` = convert_tz(utc_timestamp(),'-08:00','+0:00') WHERE " +
      sender_column +
      " = " +
      sender_id +
      " AND  " +
      receiver_column +
      "= " +
      receiver_id +
      " AND `read` IS NULL"
  );
};

const sendMessage = async (_body: any) => {
  const result = await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM auctioner_message WHERE (sender_id = '" +
      _body.customer_id +
      "' AND receiver_id='" +
      _body.receiver_id +
      "')OR  (receiver_id = '" +
      _body.customer_id +
      "' AND sender_id='" +
      _body.receiver_id +
      "')"
  );

  let chatNo = 0;
  if (result.length != 0) {
    chatNo = result[0].chat_no;
  } else {
    const temp = await prisma.$queryRawUnsafe<any[]>(
      "SELECT MAX(chat_no) as max_data FROM auctioner_message"
    );

    chatNo = temp[0]["max_data"] + 1;
  }
  console.log(chatNo);
  const dateNow = "convert_tz(utc_timestamp(),'-08:00','+0:00')";
  return await prisma.$executeRawUnsafe<any[]>(
    "INSERT INTO auctioner_message (`sender_id`,`receiver_id`,`date_added`,`message`,`chat_no`,`auction_id`,`sms_type`,`call_status`,`call_id`) values (" +
      _body.customer_id +
      "," +
      _body.receiver_id +
      "," +
      dateNow +
      ",'" +
      _body.message +
      "'," +
      chatNo +
      "," +
      _body.auction_id +
      ",'" +
      _body.smstype +
      "'," +
      _body.status +
      ", " +
      _body.call_id +
      ")"
  );
};

export default { sendMessage, readMessage, getConversation, getAllByCustomer };

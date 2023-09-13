import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1, lounge_group_id = 0, search = "" } = _query;

  if (search != "") {
    return await prisma.lounge_post.findMany({
      skip: page - 1 != 0 ? limit * page : 0,
      take: Number(limit),
      where: {
        lounge_group_id: Number(lounge_group_id),
        title: {
          startsWith: `"${search}`,
        },
      },
      orderBy: {
        date_created: "desc",
      },
    });
  }
  return await prisma.lounge_post.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
    where: {
      lounge_group_id: Number(lounge_group_id),
    },
    orderBy: {
      date_created: "desc",
    },
  });
};

const getManyIds = async (ids: number[]) => {
  return await prisma.lounge_post.findMany({
    where: {
      post_parent_id: {
        in: ids,
      },
    },
  });
};

const getById = async (id: number) => {
  return await prisma.lounge_post.findFirst({
    where: {
      post_id: id,
    },
  });
};

const add = async (_body: any) => {
  if (_body.post_parent_id) {
    return await prisma.lounge_post.create({
      data: {
        customer_id: _body.customer_id,
        post_parent_id: _body.post_parent_id,
        title: JSON.stringify(_body.title),
        file_name: _body.file_name,
        file_type: _body.file_type,
        tags: _body.tags,
        date_created: new Date(),
        date_modified: new Date(),
        lounge_group_id: _body.lounge_group_id,
      },
    });
  }
  return await prisma.lounge_post.create({
    data: {
      customer_id: _body.customer_id,
      title: JSON.stringify(_body.title),
      file_name: _body.file_name,
      file_type: _body.file_type,
      tags: _body.tags,
      date_created: new Date(),
      date_modified: new Date(),
      lounge_group_id: _body.lounge_group_id,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getManyIds, getAll, add, update, removeOne, getById };

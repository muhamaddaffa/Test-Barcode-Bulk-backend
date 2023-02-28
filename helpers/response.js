module.exports = {
  datatable: async (res, data, message, draw, recordsTotal, recordsFiltered) => {
    res.status(200).send({
      meta: {
        success: true,
        message: message,
        info: {
          draw: draw,
          recordsTotal: recordsTotal,
          recordsFiltered: recordsFiltered,
        },
      },
      data: data,
    });
  },
  success: async (res, data, message, page, limit, total) => {
    res.status(200).send({
      meta: {
        success: true,
        message: message,
        info: {
          page: page,
          limit: limit,
          total: total,
        },
      },
      data: data,
    });
  },
  noContent: async (res, message) => {
    res.status(204).send({
      meta: {
        success: true,
        message: message,
      },
      data: null,
    });
  },
  badrequest: async (res, message) => {
    res.status(400).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  forbidden: async (res, message) => {
    res.status(403).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  unauthorized: async (res, message) => {
    res.status(401).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  notfound: async (res, message) => {
    res.status(404).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  serverError: async (res, message) => {
    res.status(500).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
};

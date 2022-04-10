'use strict';

exports.pagination = (req, total, perPage=10) => {
    const totalPages = Math.ceil(total / perPage);
    const page = 'page' in req.query ? parseInt(req.query.page) : 1;
    
    const pagination = {
        page,
        totalPages,
        nextPage: page < totalPages ? page + 1 : totalPages,
        prevPage: page > 1 ? page - 1 : 1,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        hasMore: total > perPage
    }

    return pagination
}
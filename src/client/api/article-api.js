const api = require("./api").api;

const articleApi = {
    getArticleList(page) {
        return api.get(`/articles?limit=10&offset=${page * 10}`);
    },
    getMyFeedList(page) {
        return api.get(`/articles/feed?limit=10&offset=${page * 10}`);
    },
};

exports.articleApi = articleApi;
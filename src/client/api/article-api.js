const api = require("./api").api;

const articleApi = {
    getArticleList() {
        return api.get(`/articles?limit=10&offset=0`);
    },
    getMyFeedList() {
        return api.get(`/articles/feed?limit=10&offset=0`);
    },
};

exports.articleApi = articleApi;
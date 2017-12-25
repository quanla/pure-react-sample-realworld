const fetcher = require("./fetcher").fetcher;

const articleApi = {
    getArticleList(page) {
        return fetcher.get(`/articles?limit=10&offset=${page * 10}`);
    },
    getMyFeedList(page) {
        return fetcher.get(`/articles/feed?limit=10&offset=${page * 10}`);
    },
};

exports.articleApi = articleApi;
const fetcher = require("./fetcher").fetcher;

const articleApi = {
    getArticleList(page) {
        return fetcher.get(`/articles?limit=10&offset=${page * 10}`);
    },
    getMyFeedList(page) {
        return fetcher.get(`/articles/feed?limit=10&offset=${page * 10}`);
    },
    getArticleListByAuthor(page, author) {
        return fetcher.get(`/articles?author=${author}&limit=5&offset=${page * 5}`);
    },
    getFavoritedArticleList(page, by) {
        return fetcher.get(`/articles?favorited=${by}&limit=5&offset=${page * 5}`);
    },
};

exports.articleApi = articleApi;
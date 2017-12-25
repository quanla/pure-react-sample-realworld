const fetcher = require("./fetcher").fetcher;

const articleApi = {
    getArticle(slug) {
        return fetcher.get(`/articles/${slug}`).then(({article}) => article);
    },
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
    createArticle(article) {
        return fetcher.post(`/articles`, {article});
    },
    getComments(articleSlug) {
        return fetcher.get(`/articles/${articleSlug}/comments`).then(({comments}) => comments);
    },
    postComment(body, articleSlug) {
        return fetcher.post(`/articles/${articleSlug}/comments`, {comment: {body}}).then(({comment}) => comment);
    },
    deleteComment(id, articleSlug) {
        return fetcher.delete(`/articles/${articleSlug}/comments/${id}`);
    },
};

exports.articleApi = articleApi;
const fetcher = require("./fetcher").fetcher;

const tagApi = {
    getTags() {
        return fetcher.get("/tags").then((resp) => resp.tags);
    },
};

exports.tagApi = tagApi;
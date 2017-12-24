const api = require("./api").api;

const tagApi = {
    getTags() {
        return api.get("/tags").then((resp) => resp.tags);
    },
};

exports.tagApi = tagApi;
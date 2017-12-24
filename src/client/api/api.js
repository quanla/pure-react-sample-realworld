const ApiFactory = require("../common/api-factory").ApiFactory;

const api = ApiFactory.createApi({
    urlModifier: (url) => `https://conduit.productionready.io/api${url}`,
});

exports.api = api;
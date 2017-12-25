const FetcherFactory = require("../common/fetcher-factory").FetcherFactory;

const fetcher = FetcherFactory.createApi({
    urlModifier: (url) => `https://conduit.productionready.io/api${url}`,
});

exports.fetcher = fetcher;
const O = require("../../utils/object-util").O;
const FetcherFactory = {
    createApi({urlModifier, getHeaders}) {


        let createHeaders = () => {
            let headers = new Headers();
            O.forEach(getHeaders(), (value, key) =>
                headers.append(key, value)
            );
            return headers;
        };

        const withPayload = (method) => (url, data) => {
            let headers = createHeaders();
            headers.append("Content-Type", "application/json");
            return fetch(urlModifier(url), {
                method,
                body: JSON.stringify(data),
                headers,
            }).then((response) => response.json());
        };
        const withoutPayload = (method) => (url) => {
            let headers = createHeaders();
            return fetch(urlModifier(url), {
                method,
                headers
            }).then((response) => response.json());
        };

        return {
            get: withoutPayload("GET"),
            delete: withoutPayload("DELETE"),
            post: withPayload("POST"),
            put: withPayload("PUT"),
        };
    }
};

exports.FetcherFactory = FetcherFactory;
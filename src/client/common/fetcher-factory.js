const O = require("../../utils/object-util").O;
const FetcherFactory = {
    createApi({urlModifier, getHeaders}) {

        const withPayload = (method) => (url, data) => {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            O.forEach(getHeaders(), (value, key) =>
                headers.append(key, value)
            );
            return fetch(urlModifier(url), {
                method,
                body: JSON.stringify(data),
                headers,
            }).then((response) => response.json());
        };
        const withputPayload = (method) => (url) => {
            var headers = new Headers();
            O.forEach(getHeaders(), (value, key) =>
                headers.append(key, value)
            );
            return fetch(urlModifier(url), {
                method,
                headers
            }).then((response) => response.json());
        };

        return {
            get: withputPayload("GET"),
            delete: withputPayload("DELETE"),
            post: withPayload("POST"),
            put: withPayload("PUT"),
        };
    }
};

exports.FetcherFactory = FetcherFactory;
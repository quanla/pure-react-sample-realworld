const O = require("../../utils/object-util").O;
const FetcherFactory = {
    createApi({urlModifier, getHeaders}) {
        return {
            get: (url) => {
                var headers = new Headers();
                O.forEach(getHeaders(), (value, key) =>
                    headers.append(key, value)
                );
                return fetch(urlModifier(url), {
                    headers
                }).then((response) => response.json());
            },
            post: (url, data) => {
                var headers = new Headers();
                headers.append("Content-Type", "application/json");
                O.forEach(getHeaders(), (value, key) =>
                    headers.append(key, value)
                );
                return fetch(urlModifier(url), {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers,
                }).then((response) => response.json());
            },
        };
    }
};

exports.FetcherFactory = FetcherFactory;
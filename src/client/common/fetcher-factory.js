const FetcherFactory = {
    createApi({urlModifier}) {
        return {
            get: (url) => {
                return fetch(urlModifier(url), {}).then((response) => response.json());
            },
            post: (url, data) => {
                var headers = new Headers();
                headers.append("Content-Type", "application/json");
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
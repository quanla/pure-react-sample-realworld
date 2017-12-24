const ApiFactory = {
    createApi({urlModifier}) {
        return {
            get: (url) => {
                return fetch(urlModifier(url), {}).then((response) => response.json());
            },
            post: (url, data) => {
                return fetch(urlModifier(url), {
                    method: "POST",
                    body: JSON.stringify(data),
                }).then((response) => response.json());
            },
        };
    }
};

exports.ApiFactory = ApiFactory;
const ApiFactory = {
    createApi({urlModifier}) {
        return {
            get: (url) => {
                return fetch(urlModifier(url)).then((response) => response.json());
            }
        };
    }
};

exports.ApiFactory = ApiFactory;
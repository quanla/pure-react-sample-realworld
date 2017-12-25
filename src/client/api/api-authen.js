let isAuthen = () => true;

const apiAuthen = (api) => (...args) => {
    if (!isAuthen()) {
        return Promise.reject("Unauthorized api access");
    }

    return api.apply(null, args);
};

exports.apiAuthen = apiAuthen;

exports.apiAuthenConfig = {
    setAuthen(fn) {
        isAuthen = fn;
    }
};
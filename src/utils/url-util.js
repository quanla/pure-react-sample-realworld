const O = require("./object-util").O;
const UrlUtil = {
    queryString(params) {
        let ret = "";
        O.forEach(params, (v, k)=> {
            if (v == null) {
                return;
            }
            if (ret.length > 0) {
                ret += "&";
            }
            ret += `${k}=${encodeURIComponent(v)}`;
        });
        return ret.length == 0 ? ret : "?" + ret;
    }
};

exports.UrlUtil = UrlUtil;

function isEmpty(val) {
    return val == null || val === "";
}

function isBlank(val) {
    return isEmpty(val) || val.replace(/\s/g, "").length == 0;
}

const StringUtil = {
    isEmpty,
    isBlank,
};

exports.StringUtil = StringUtil;
const {StringUtil} = require("./string-util.js");

function nextPathAttr(path) {
    if (!isNaN(path)) {
        return {
            attr: path,
            nextPath: null,
        };
    }
    if (path.startsWith("[")) {
        let indexOf = path.indexOf("]");
        if (indexOf == -1) {
            throw "Unclosed [";
        }
        return {
            attr: JSON.parse(path.substring(1, indexOf)),
            nextPath: path.substring(indexOf + 1).replace(/^\./,""),
        };
    } else {
        let match = /[.\[]/.exec(path);
        if (match == null) {
            return {
                attr: path,
                nextPath: "",
            };
        }

        return {
            attr: path.substring(0, match.index),
            nextPath: path.substring(match.index).replace(/^\./,""),
        };
    }
}

function updatePath(object, path, value) {

    if (StringUtil.isEmpty(path)) {
        return value;
    }

    let {attr, nextPath} = nextPathAttr(path);

    if (Array.isArray(object)) {
        let clone = object.slice(0);
        clone[attr] = updatePath(object && object[attr], nextPath, value);
        return clone;
    } else {
        return Object.assign({}, object, {[attr]: updatePath(object && object[attr], nextPath, value)});
    }

}

function mapValuesToList(obj, fn) {
    let ret = [];

    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret.push(fn(obj[k], k));
        }
    }

    return ret;
}

function forEach(obj, fn) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            let interrupted = fn(obj[k], k);
            if (interrupted) {
                return;
            }
        }
    }
}

const O = {
    forEach,
    updatePath,
    mapValuesToList,
};

exports.O = O;

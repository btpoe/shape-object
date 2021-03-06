function parseGraph(str) {
    var res = {};

    var parts = str.match(/[^\s,{}]+|{|}/g);
    var part;
    var lastPart;
    var refStack = [res];

    while (part = parts.shift()) {
        switch (part) {
            case '{':
                if (lastPart) {
                    refStack.unshift(refStack[0][lastPart] = {});
                }
                break;
            case '}':
                refStack.shift();
                break;
            default:
                refStack[0][part] = null;
                break;
        }

        lastPart = part;
    }

    return res;
}

function shapeObjectInternal(obj, ref) {
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return shapeObjectInternal(item, ref); });
    }

    var result = {};

    for (var prop in ref) {
        if (ref.hasOwnProperty(prop) && typeof obj[prop] !== 'undefined') {
            if (ref[prop] && typeof ref[prop] === 'object') {
                result[prop] = shapeObjectInternal(obj[prop], ref[prop]);
            } else {
                result[prop] = obj[prop];
            }
        }
    }

    return result;
}

module.exports = function shapeObject(obj, ref) {
    if (typeof ref === 'string') {
        ref = parseGraph(ref);
    }

    return shapeObjectInternal(obj, ref);
};

const Cols = require("../../../../../utils/cols").Cols;
const SensiblePointer = {
    determine(list, {current, disabled, forced}) {
        let forcedIndex = Cols.indexOf(list, forced);
        if (forcedIndex > -1) {
            return forcedIndex;
        }

        for (let i = current; i < list.length; i++) {
            let e = list[i];
            if (!disabled(e)) {
                return i;
            }
        }
        for (let i = current - 1; i > -1; i--) {
            let e = list[i];
            if (!disabled(e)) {
                return i;
            }
        }
    }
};

exports.SensiblePointer = SensiblePointer;
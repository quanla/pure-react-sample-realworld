
function indexOf(col, find) {
    if (col == null) {
        return -1;
    }
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        if (find(e, i)) {
            return i;
        }
    }
    return -1;
}

function addRemove(col) {
    return (element) => {

        col.push(element);

        return () => remove1Mutate(col, element);
    };
}

function remove1Mutate(col, targetElem) {
    if (col== null) {
        return;
    }

    let i = col.indexOf(targetElem);
    if (i == -1) {
        return;
    }
    col.splice(i, 1);
}

const Cols = {
    addRemove,
    indexOf,
    /**
     * Immutable
     * @param col
     * @param targetElem
     * @param replaceElem
     * @returns {null}
     */
    replace1(col, targetElem, replaceElem) {
        return col == null ? null : col.map((t)=> {
            if (targetElem == t) {
                return replaceElem;
            } else {
                return t;
            }
        });
    },
    remove1(col, targetElem) {
        return col== null ? null : col.filter((t)=> targetElem !== t);
    },
};

exports.Cols = Cols;
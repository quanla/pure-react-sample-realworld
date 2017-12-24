import {Cols} from "../../../utils/cols";

let changeListeners = [];
let user = (()=> {
    let dataString = localStorage.getItem("user-info");
    return dataString == null || dataString=="undefined" ? null : JSON.parse(dataString);
})();

const userInfo = {
    getUser: () => user,
    setUser: (user1) => {
        user = user1;

        if (user) {
            localStorage.setItem("user-info", JSON.stringify(user));
        } else {
            localStorage.removeItem("user-info");
        }

        changeListeners.forEach((l) => l(user));
    },
    onChange: Cols.addRemove(changeListeners),
};

exports.userInfo = userInfo;
const api = require("./api").api;

const userApi = {
    register({email, password, username}) {
        return api.post("/users", {user: {email, password, username}});
    },
};

exports.userApi = userApi;
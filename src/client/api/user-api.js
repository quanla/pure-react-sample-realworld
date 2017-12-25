const fetcher = require("./fetcher").fetcher;

const userApi = {
    register({email, password, username}) {
        return fetcher.post("/users", {user: {email, password, username}});
    },
};

exports.userApi = userApi;
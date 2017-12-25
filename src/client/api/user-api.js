const fetcher = require("./fetcher").fetcher;

const userApi = {
    register({email, password, username}) {
        return fetcher.post("/users", {user: {email, password, username}});
    },
    login({email, password}) {
        return fetcher.post("/users/login", {user: {email, password}});
    },
};

exports.userApi = userApi;
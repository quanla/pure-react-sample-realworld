const fetcher = require("./fetcher").fetcher;

const profileApi = {
    getProfile(username) {
        return fetcher.get(`/profiles/${username}`).then(({profile}) => profile);
    },
    follow(username) {
        return fetcher.post(`/profiles/${username}/follow`).then(({profile}) => profile);
    },
    unfollow(username) {
        return fetcher.delete(`/profiles/${username}/follow`).then(({profile}) => profile);
    },
};

exports.profileApi = profileApi;
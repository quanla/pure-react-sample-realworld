import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link, Route} from "react-router-dom";
import {profileApi} from "../../../api/profile-api";
import {articleApi} from "../../../api/article-api";
import {renderArticleTabs} from "./article-tabs";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";

export class ProfileRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            profile: null,
        };

        profileApi.getProfile(props.match.params.username).then((profile) => {
            if (profile == null) {
                props.history.push("/");
                return;
            }
            return this.setState({profile});
        });
    }

    render() {

        const {history, match} = this.props;
        const {profile} = this.state;

        let username = this.props.match.params.username;

        return (
            <Layout
                windowTitle={`@${username}`}
                history={history}
            >

                <div className="profile-page">

                    <div className="user-info">
                        <div className="container">
                            <div className="row">

                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    {profile == null ? (
                                        <LoadingPanel/>
                                    ) : (
                                        <Fragment>
                                            <img src={profile.image} className="user-img" />
                                            <h4>{profile.username}</h4>
                                            <p>{profile.bio}</p>
                                        </Fragment>
                                    )}
                                    <button className="btn btn-sm btn-outline-secondary action-btn">
                                        <i className="ion-plus-round"/>
                                        &nbsp;
                                        Follow {username}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {renderArticleTabs(
                                    [
                                        {
                                            label: "My Articles",
                                            url: "",
                                            api: (page) => articleApi.getArticleListByAuthor(page, username),
                                        },
                                        {
                                            label: "Favorited Articles",
                                            url: "/favorites",
                                            api: (page) => articleApi.getFavoritedArticleList(page, username),
                                        }
                                    ],
                                    match.url, history.location.pathname
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </Layout>
        );
    }
}

import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {Link, Route} from "react-router-dom";
import {articleApi} from "../../../api/article-api";
import {renderArticleTabs} from "./article-tabs";
import {ProfileHeader} from "./profile-header";

export class ProfileRoute extends RComponent {

    render() {

        const {history, match} = this.props;

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
                                    <ProfileHeader
                                        key={username}
                                        username={username}
                                        onInvalidProfile={() => this.props.history.push("/")}
                                    />
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

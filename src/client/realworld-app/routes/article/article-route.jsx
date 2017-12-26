import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {articleApi} from "../../../api/article-api";
import {Fragment} from "react";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";
import {CommentsBox} from "./comments-box/comments-box";
import {ArticleMeta} from "./article-meta";
import {MarkDown} from "./markdown";

export class ArticleRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            article: null,
        };

        articleApi.getArticle(props.match.params.slug).then((article) => this.setState({article}));
    }

    render() {
        const {history} = this.props;
        const {article} = this.state;

        return (
            <Layout
                windowTitle={article == null ? "Loading article..." : article.title}
                history={history}
            >
                <div className="article-page">

                    <div className="banner">
                        <div className="container">

                            {article == null ? (
                                <LoadingPanel/>
                            ) : (
                                <Fragment>

                                    <h1>{article.title}</h1>

                                    <ArticleMeta
                                        article={article}
                                        onChange={(article) => this.setState({article})}
                                        onDeleted={() => history.push("/")}
                                    />
                                </Fragment>
                            )}

                        </div>
                    </div>

                    <div className="container page">

                        <div className="row article-content">
                            <div className="col-md-12">
                                {article == null ? (
                                    <LoadingPanel/>
                                ) : (
                                    <Fragment>
                                        <MarkDown value={article.body}/>

                                        <ul className="tag-list">
                                            {article.tagList && article.tagList.map((tag, i) => (
                                                <li className="tag-default tag-pill tag-outline" key={i}>
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </Fragment>
                                )}
                            </div>
                        </div>

                        <hr />

                        <div className="article-actions">
                            {article == null ? (
                                <LoadingPanel/>
                            ) : (
                                <ArticleMeta
                                    article={article}
                                />
                            )}
                        </div>

                        <div className="row">

                            <div className="col-xs-12 col-md-8 offset-md-2">

                                <CommentsBox
                                    articleSlug={this.props.match.params.slug}
                                />

                            </div>

                        </div>

                    </div>
                </div>
            </Layout>
        );
    }
}


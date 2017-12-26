import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {tagApi} from "../../../api/tag-api";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";
import {FeedsPanel} from "./feeds-panel";
import {userInfo} from "../../authen/user-info";
import {PagingArticleList} from "./paging-article-list";
import {articleApi} from "../../../api/article-api";

export class HomeRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tags: null,
            showTag: null,
        };

        tagApi.getTags().then((tags) => this.setState({tags}));
        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));

    }

    render() {
        const {history} = this.props;
        const {tags, showTag} = this.state;

        return (
            <Layout
                windowTitle="Home"
                history={history}
            >
                <div className="home-page">

                    {userInfo.getUser() == null && (
                        <div className="banner">
                            <div className="container">
                                <h1 className="logo-font">conduit</h1>
                                <p>A place to share your knowledge.</p>
                            </div>
                        </div>
                    )}

                    <div className="container page">
                        <div className="row">

                            <FeedsPanel
                                className="col-md-9"
                                forcedTab={
                                    showTag && ({
                                        tabLabel: `# ${showTag}`,
                                        render: () => (
                                            <PagingArticleList
                                                key={showTag}
                                                api={(page) => articleApi.getArticleListByTag(page, showTag)}
                                            />
                                        )
                                    })
                                }
                                onChangedTab={() => showTag && this.setState({showTag: null})}
                            />

                            <div className="col-md-3">
                                <div className="sidebar">
                                    <p>Popular Tags</p>

                                    <div className="tag-list">
                                        {tags == null ? (
                                            <LoadingPanel/>
                                        ) : (
                                            tags.map((tag, i) => (
                                                <a
                                                    href="" className="tag-pill tag-default"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.setState({showTag: tag});
                                                    }}
                                                    key={i}
                                                >{tag}</a>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Layout>
        );
    }
}
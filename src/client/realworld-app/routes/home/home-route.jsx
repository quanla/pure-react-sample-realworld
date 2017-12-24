import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Layout} from "../layout/layout";
import {tagApi} from "../../../api/tag-api";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";
import {FeedsPanel} from "./feeds-panel";
import {userInfo} from "../../authen/user-info";

export class HomeRoute extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tags: null,
        };

        tagApi.getTags().then((tags) => this.setState({tags}));
        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));

    }

    render() {
        const {history} = this.props;
        const {tags} = this.state;

        return (
            <Layout
                className="home-route"
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
                            />

                            <div className="col-md-3">
                                <div className="sidebar">
                                    <p>Popular Tags</p>

                                    <div className="tag-list">
                                        {tags == null ? (
                                            <LoadingPanel/>
                                        ) : (
                                            tags.map((tag) => (
                                                <a href="" className="tag-pill tag-default">{tag}</a>
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
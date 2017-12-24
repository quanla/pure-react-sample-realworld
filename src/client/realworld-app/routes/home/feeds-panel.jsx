import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {TabsPanel} from "./tabs-panel";
import {PagingArticleList} from "./paging-article-list";
import {articleApi} from "../../../api/article-api";
import {userInfo} from "../../authen/user-info";

export class FeedsPanel extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        const {className} = this.props;

        return (
            <TabsPanel
                className={className}
                tabs={
                    (userInfo.getUser() == null ? [] : [
                        {
                            tabLabel: "Your Feed",
                            render: () => (
                                <PagingArticleList
                                    api={(page) => articleApi.getMyFeedList(page)}
                                />
                            )
                        }
                    ])
                        .concat([
                            {
                                tabLabel: "Global Feed",
                                render: () => (
                                    <PagingArticleList
                                        api={(page) => articleApi.getArticleList(page)}
                                    />
                                )
                            }
                        ])
                }
            />
        );
    }
}
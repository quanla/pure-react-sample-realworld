import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {TabsPanel} from "./tabs-panel/tabs-panel";
import {PagingArticleList} from "./paging-article-list";
import {articleApi} from "../../../api/article-api";
import {userInfo} from "../../authen/user-info";

export class FeedsPanel extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        const {className, forcedTab, onChangedTab} = this.props;

        const tabs = [
            userInfo.getUser() && ({
                tabLabel: "Your Feed",
                render: () => (
                    <PagingArticleList
                        api={(page) => articleApi.getMyFeedList(page)}
                    />
                ),
            }),
            {
                tabLabel: "Global Feed",
                render: () => (
                    <PagingArticleList
                        api={(page) => articleApi.getArticleList(page)}
                    />
                )
            },
            forcedTab && {...forcedTab, forced: true}
        ];

        return (
            <TabsPanel
                className={className}
                tabs={tabs}
                onChange={() => onChangedTab()}
            />
        );
    }
}
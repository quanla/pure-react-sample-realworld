import classnames from "classnames";
import {Fragment} from "react";
import {Link, Route} from "react-router-dom";
import {PagingArticleList} from "../home/paging-article-list";

export const renderArticleTabs = (tabs, parentUrl, currentUrl) => {
    return (
        <Fragment>
            <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                    {tabs.map((tab, i) => (
                        <li className="nav-item" key={i}>
                            <Link
                                className={classnames("nav-link", {active: currentUrl == `${parentUrl}${tab.url}`})}
                                to={`${parentUrl}${tab.url}`}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {tabs.map((tab, i) => (
                <Route
                    exact
                    path={`${parentUrl}${tab.url}`}
                    render={() => (
                        <PagingArticleList
                            api={(page) => tab.api(page)}
                        />
                    )}
                    key={i}
                />
            ))}
        </Fragment>
    );
};
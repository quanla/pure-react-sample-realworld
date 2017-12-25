import classnames from "classnames";
import {Fragment} from "react";
import {Link, Route} from "react-router-dom";
import {PagingArticleList} from "../home/paging-article-list";

export const renderArticleTabs = (tabs, parentUrl, currentUrl) => {
    return (
        <Fragment>
            <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                    {tabs.map((tab) => (
                        <li className="nav-item">
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

            {tabs.map((tab) => (
                <Route
                    exact
                    path={`${parentUrl}${tab.url}`}
                    render={() => (
                        <PagingArticleList
                            api={(page) => tab.api(page)}
                        />
                    )}
                />
            ))}
        </Fragment>
    );
};
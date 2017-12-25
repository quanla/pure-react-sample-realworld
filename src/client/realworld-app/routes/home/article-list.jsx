import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {FavoriteButton} from "../common/favorite-button";
import {Cols} from "../../../../utils/cols";

export class ArticleList extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            articles: null,
        };

        props.api().then((articles) => this.setState({articles}));
    }

    render() {
        const {articles} = this.state;

        return (
            <Fragment>
                {articles == null ? (
                    <div className="article-preview">
                        Loading articles...
                    </div>
                ) : articles.length == 0 ? (
                    <div className="article-preview">
                        No articles are here... yet.
                    </div>
                ) : (
                    articles.map((article) => (
                        <div className="article-preview">
                            <div className="article-meta">
                                <Link to={`/@${article.author.username}`}><img src={article.author.image} /></Link>
                                <div className="info">
                                    <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
                                    <span className="date">{new Date(article.createdAt).toLocaleString()}</span>
                                </div>

                                <FavoriteButton
                                    className="pull-xs-right"
                                    favorited={article.favorited}
                                    favoritesCount={article.favoritesCount}
                                    articleSlug={article.slug}
                                    onChange={({favorited, favoritesCount}) => this.setState({articles: Cols.replace1(articles, article, {
                                        ...article,
                                        favorited,
                                        favoritesCount
                                    })})}
                                />
                            </div>
                            <Link to={`/article/${article.slug}`} className="preview-link">
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                <span>Read more...</span>

                                <ul className="tag-list">
                                    {article.tagList && article.tagList.map((tag) => (
                                        <li className="tag-default tag-pill tag-outline">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </div>
                    ))
                )}
            </Fragment>
        );
    }
}
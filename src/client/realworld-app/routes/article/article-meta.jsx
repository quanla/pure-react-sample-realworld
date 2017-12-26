import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Link} from "react-router-dom";
import {Fragment} from "react";
import {FollowButton} from "../common/follow-button";
import {O} from "../../../../utils/object-util";
import {FavoriteButton} from "../common/favorite-button";
import {userInfo} from "../../authen/user-info";
import {articleApi} from "../../../api/article-api";

export class ArticleMeta extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            deleting: false,
        };
    }

    deleteArticle() {
        this.setState({deleting: true});
        const {article, onDeleted} = this.props;
        articleApi.deleteArticle(article.slug).then(onDeleted);
    }

    render() {
        const {article, onChange} = this.props;
        let user = userInfo.getUser();
        return (
            <div className="article-meta">
                <Link to={`/@${article.author.username}`}><img src={article.author.image} /></Link>
                <div className="info">
                    <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
                    <span className="date">{new Date(article.updatedAt).toLocaleString()}</span>
                </div>
                {user == null || user.username != article.author.username ? (
                    <Fragment>
                        <FollowButton
                            username={article.author.username}
                            following={article.author.following}
                            onChange={(following) => onChange(O.updatePath(article, "author.following", following))}
                        />
                        &nbsp;&nbsp;
                        <FavoriteButton
                            favorited={article.favorited}
                            favoritesCount={article.favoritesCount}
                            articleSlug={article.slug}
                            onChange={({favorited, favoritesCount}) => onChange({
                                ...article,
                                favorited,
                                favoritesCount
                            })}
                            long
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${article.slug}`}>
                            <i className="ion-edit"/> Edit Article
                        </Link>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => this.deleteArticle()}
                        >
                            <i className="ion-trash-a"/> Delete Article
                        </button>
                    </Fragment>
                )}
            </div>
        );
    }
}
import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Link} from "react-router-dom";
import {Fragment} from "react";
import moment from "moment";
import {FollowButton} from "../common/follow-button";
import {O} from "../../../../utils/object-util";
import {FavoriteButton} from "../common/favorite-button";

export class ArticleMeta extends RComponent {

    render() {
        const {article, onChange} = this.props;
        return (
            <div className="article-meta">
                <Link to={`/@${article.author.username}`}><img src={article.author.image} /></Link>
                <div className="info">
                    <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
                    <span className="date">{moment(article.createdAt).format("LL")}</span>
                </div>
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
            </div>
        );
    }
}
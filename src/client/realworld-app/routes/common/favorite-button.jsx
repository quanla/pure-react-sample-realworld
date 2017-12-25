import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {articleApi} from "../../../api/article-api";

export class FavoriteButton extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
        };
    }

    change(favorite) {
        const {articleSlug, onChange} = this.props;
        this.setState({loading: true});

        articleApi.changeFavorite(favorite, articleSlug).then(({favorited, favoritesCount}) => {
            this.setState({loading: false});
            onChange({favorited, favoritesCount});
        });
    }

    render() {
        const {favorited, favoritesCount, className, long} = this.props;
        const {loading} = this.state;

        return (
            <button
                className={classnames(
                    "btn btn-sm",
                    className,
                    favorited ? "btn-primary" : "btn-outline-primary"
                )}
                disabled={loading}
                onClick={() => this.change(!favorited)}
            >
                {!long ? (
                    <Fragment>
                        <i className="ion-heart"/> {favoritesCount}
                    </Fragment>
                ) : (
                    <Fragment>
                        <i className="ion-heart"/>
                        &nbsp;
                        Favorite Article <span className="counter">({favoritesCount})</span>
                    </Fragment>
                )}
            </button>
        );
    }
}
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
        const {favorited, favoritesCount} = this.props;

        return (
            <button
                className={classnames(
                    "btn btn-sm pull-xs-right",
                    favorited ? "btn-primary" : "btn-outline-primary"
                )}
                onClick={() => this.change(!favorited)}
            >
                <i className="ion-heart"/> {favoritesCount}
            </button>
        );
    }
}
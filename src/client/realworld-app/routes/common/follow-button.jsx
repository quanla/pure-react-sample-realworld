import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {profileApi} from "../../../api/profile-api";

export class FollowButton extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
        };
    }

    follow(follow) {
        const {username, onChange} = this.props;
        this.setState({loading: true});
        profileApi[follow ? "follow": "unfollow"](username).then((profile) => {
            onChange(profile.following);
            return this.setState({loading: false});
        });
    }

    render() {
        const {username, className, following} = this.props;
        const {loading} = this.state;

        return (
            <button
                className={classnames("btn btn-sm btn-outline-secondary", className)}
                onClick={() => this.follow(!following)}
                disabled={loading}
            >
                <i className="ion-plus-round"/>
                &nbsp;
                {following ? "Unfollow" : "Follow"} {username}
            </button>
        );
    }
}
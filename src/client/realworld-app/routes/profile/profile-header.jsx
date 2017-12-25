import classnames from "classnames";
import {Fragment} from "react";
import {RComponent} from "../../../common/r-component";
import {Link, Route} from "react-router-dom";
import {profileApi} from "../../../api/profile-api";
import {LoadingPanel} from "../../../common/loading-panel/loading-panel";
import {userInfo} from "../../authen/user-info";

export class ProfileHeader extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            profile: null,
            following: false,
        };

        profileApi.getProfile(props.username).then((profile) => {
            if (profile == null) {
                props.onInvalidProfile();
                return;
            }
            return this.setState({profile});
        });
    }

    follow(follow) {
        const {username} = this.props;
        this.setState({following: true});
        profileApi[follow ? "follow": "unfollow"](username).then((profile) => this.setState({profile, following: false}));
    }

    render() {
        const {username} = this.props;
        const {profile, following} = this.state;

        let user = userInfo.getUser();
        return (
            <Fragment>

                {profile == null ? (
                    <LoadingPanel/>
                ) : (
                    <Fragment>
                        <img src={profile.image} className="user-img" />
                        <h4>{profile.username}</h4>
                        <p>{profile.bio}</p>
                    </Fragment>
                )}
                {user && username == user.username ? (
                    <Link to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                        <i className="ion-gear-a"/> Edit Profile Settings
                    </Link>
                ) : (
                    <button
                        className="btn btn-sm btn-outline-secondary action-btn"
                        onClick={() => profile && this.follow(!profile.following)}
                        disabled={following}
                    >
                        <i className="ion-plus-round"/>
                        &nbsp;
                        {profile && profile.following ? "Unfollow" : "Follow"} {username}
                    </button>
                )}
            </Fragment>
        );
    }
}
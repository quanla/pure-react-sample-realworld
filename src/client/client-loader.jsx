import {RealWorldApp} from "./realworld-app/realworld-app";
import React from "react";
import ReactDOM from "react-dom";

window.React = React;

ReactDOM.render((
    <RealWorldApp/>
), document.getElementById("app-container"));

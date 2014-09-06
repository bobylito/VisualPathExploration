/** @jsx React.DOM */

var React = require("react/addons");
var Main = require("./components");

React.renderComponent( <Main file="data/train.csv" height={window.innerHeight} width={window.innerWidth} />, window.document.body );

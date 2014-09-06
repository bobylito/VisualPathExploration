/** @jsx React.DOM */

var React = require("react/addons");
var Main = require("./components");

React.renderComponent( <Main file="data/train.csv" height="800" width="800"/>, window.document.body );

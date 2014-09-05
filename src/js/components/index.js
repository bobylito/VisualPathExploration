/** @jsx React.DOM */

var React = require("react/addons");
var _ = require("underscore");

var Path = require("../data/path.js");

var Main = React.createClass({
  getInitialState : function(){
    return {
      loadingSteps: []
    };
  },
  componentWillMount: function(){
    //Ajax call
  },
  render: function(){
    var messages = _.map( this.state.loadingSteps, 
                          function(m){
                            return <li>{m}</li>; });
    return <div>
      <svg width={this.props.width} height={this.props.height}>
  
      </svg> 
      <div className="log">
        <ul>{messages}</ul>
      </div>
    </div>;
  }
});

module.exports=Main;

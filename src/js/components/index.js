/** @jsx React.DOM */

var React = require("react/addons");
var _ = require("underscore");
var $ = require("jquery");

var Path = require("../data/path.js");
var Graph= require("./Graph.js");

var Main = React.createClass({
  getInitialState : function(){
    var props = this.props;
    $.get(props.file)
     .then(this.parseCsv)
     .then(this.log.bind(this, "Dataset loaded"));
    return {
      loadingSteps: ["Loading dataset: " + props.file],
      data : null
    };
  },
  log:function(msg){
    this.setState({
      loadingSteps: this.state.loadingSteps.concat(msg)});
  },
  parseCsv: function(data){
    this.log("Parsing dataset");
    var parsed = _.map( data.split("\n"), function(line){
                    var columns = line.split(","),
                        data    = _.map( _.initial(columns), parseFloat),
                        type    = _.last(columns);
                    return Path.create(type, data);});
    console.log("load");
    this.setState({data: parsed});
  },
  render: function(){
    var messages = _.map( this.state.loadingSteps, 
                          function(m, id){
                            return <li key={id}>{m}</li>; }),
        graph    = this.state.data===null ? 
                     <g/> :
                     <Graph data={this.state.data}
                            width={this.props.width}
                            height={this.props.height}/>;
    return <div>
      <svg width={this.props.width} height={this.props.height}> 
        {graph}
      </svg> 
      <div className="log">
        <ul>{messages}</ul>
      </div>
    </div>;
  }
});

module.exports=Main;

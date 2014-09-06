/** @jsx React.DOM */

var React = require("react/addons");
var _     = require("underscore");
var d3    = require("d3");

var Graph = React.createClass({
  getInitialState: function(){
    var data = this.props.data,
        size = this.props.size,
        size = [parseInt(this.props.width, 10), parseInt(this.props.height, 10)],
        links= _.chain(data)
                .map(function(source){
                    return _.map( data, function(target){
                      return {source : source,
                              target : target}});})
                .flatten(true).value(),
        force= d3.layout
                 .force()
                 .size(size)
                 .nodes( data )
                 .links( links )
                 .linkDistance( function( link ){
                   return parseFloat(data[ link.source.index ].similiraties[ link.target.index ]);})
                 //.on( "start", this.startSim )
                 .on( "tick", this.tickSim )
                 //.on( "end", this.endSim )
                 .start(); 
    return {
      layout : force,
      points : []
    };
  },
  tickSim : function(){
    this.setState({
      points : this.state.layout.nodes()
    });
    //console.log(arguments);
  },
  startSim : function(){
    console.log(arguments);
  },
  endSim : function(){
    console.log(arguments);
  },
  render: function(){
    var nodes = _.map( this.state.points, function(p){
      return <circle id={p.index} cx={p.x} cy={p.y} r="5" fill='steelblue'/> ; });
    return <g>
        {nodes}
      </g>;
  }
});

module.exports=Graph;

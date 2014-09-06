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
                    return _.chain( source.similiraties )
                            .zip( _.range( source.similiraties.length ) )
                            .sortBy( function(s){ return s[0]; })
                            .first( 2 )
                            .map( function(s) {
                              return { source : source,
                                       target : data[s[1]]}; }).value() })
                .flatten(true).value(),
        force= d3.layout
                 .force()
                 .size(size)
                 .nodes( data )
                 //.gravity( 0.1 )
                 .links( links )
                 .linkStrength( 0.01 )
                 .linkDistance( function( link ){
                   return 50 * (1 - parseFloat(data[ link.source.index ].similiraties[ link.target.index ]));})
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
      points : this.state.layout.nodes(),
      links  : this.state.layout.links()
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
          return <circle id={p.index} cx={p.x} cy={p.y} r="5" fill='steelblue'/> ; }),
        links = _.map( this.state.links, function(l){
          var p1 = l.source,
              p2 = l.target;
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(0,0,0,0.1)" stroke-width="2"/> });
    return <g>{links}{nodes}</g>;
  }
});

module.exports=Graph;

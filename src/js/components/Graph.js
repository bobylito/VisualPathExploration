/** @jsx React.DOM */

var React = require("react/addons");
var _     = require("underscore");
var d3    = require("d3");

var Graph = React.createClass({
  getInitialState: function(){
    var data = this.props.data,
        size = [parseInt(this.props.width, 10), parseInt(this.props.height, 10)],
        links= _.chain(data)
                .map(function(source){
                    return _.chain( source.similiraties )
                            .zip( _.range( source.similiraties.length ) )
                            .filter( function(s){ return s[0] != 1; } )
                            .sortBy( function(s){ return s[0]; })
                            .last( 3 )
                            .map( function(s) {
                              //console.log(s);
                              return { source : source,
                                       target : data[s[1]]}; }).value() })
                .flatten(true).value(),
        nodes= _.map( data, function(p){
                    var targetTimes = _.reduce( links, function(n, link){ 
                      return link.target === p ? n + 1: n }, 0);
                    p.targetTimes = targetTimes;
                    console.log(targetTimes);
                    return p;});
        force= d3.layout
                 .force()
                 .size(size)
                 .nodes( nodes )
                 .charge( function(n){
                    return -0.5 * (n.targetTimes * n.targetTimes * n.targetTimes)})
                 .gravity( 0.05 )
                 //.theta( 10 )
                 .links( links )
                 .linkStrength( 0.1 )
                 .linkDistance( function( link ){
                   var similarity = parseFloat(data[ link.source.index ].similiraties[ link.target.index ]);
                   return 20 + 80 * (1 - similarity);})
                 .on( "start", this.startSim )
                 .on( "tick", this.tickSim )
                 .on( "end", this.endSim )
                 .start(); 
    return {
      size   : size,
      alpha  : null,
      layout : force,
      points : [],
      colors : d3.scale.category10()
    };
  },
  tickSim : function(e){
    this.setState({
        alpha : e.alpha
      });
    //console.log(arguments);
  },
  startSim : function(){
    console.log("Simulation started");
  },
  endSim : function(){
    this.setState({
      alpha  : null,
      points : this.state.layout.nodes(),
      links  : this.state.layout.links() });
    console.log("Simulation ended");
  },
  render: function(){
    var size   = this.state.size,
        colors = this.state.colors,
        loader = this.state.alpha ? <text textAnchor="middle" x={size[0]/2} y={size[1]/2}>
                                      {"Loading (" + this.state.alpha.toFixed(5) + ")"}</text> :
                                    <g/>,
        nodes = _.map( this.state.points, function(p){
          var radius = 5 + (p.targetTimes );
          return <circle id={p.index} cx={p.x} cy={p.y} r={radius} fill={colors(p.type)}/> ; }),
        links = _.map( this.state.links, function(l){
          var p1 = l.source,
              p2 = l.target;
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(0,0,0,0.1)" strokeWidth="1"/> });
    return <g>{loader}{links}{nodes}</g>;
  }
});

module.exports=Graph;



var mydata = d3.csv("data1.csv", function(data) {
    data.forEach(function(d) {
        Total = +d.Total;
        country = d.country;
        happy = +d.happy;
        hate = +d.hate;
        love = +d.love;
        sad = +d.sad;
    });
    console.log(data);

var tooltip = d3.select("body") //set the tooltip
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px PT Sans")
    .text("tooltip");


  var hsScale = d3.scale.linear()
    .domain([0,0.15]).range([0,100]);

  var totalScale = d3.scale.log()
    .domain([10, 500000])
    .range([0, 100]);

  var color = d3.scale.ordinal()
      .domain([0,0.15])
      .range(["red", "white", "green"]);

  var svg1 = d3.select("body").selectAll("#svg_bubble1")
  // ,
  //   margin = {top: 20, right: 20, bottom: 20, left: 20},
  //   width = +svg.attr("width") - margin.left - margin.right,
  //   height = +svg.attr("height") - margin.top - margin.bottom;

  var bwidth = 20;
  var sheight =700;
  var swidth =700;
  


  var nodes = svg1.selectAll(".node")
      .data(data)
    .enter().append("g")
      .attr("class", "node");

//.html(d3.event.pageX + "<br> line")

  nodes.append("circle")
      .attr("cx", function(d, i) {return  6*hsScale((d.love-d.hate)/d.Total);})
      .attr("cy", function(d) {return sheight - 6*hsScale((d.happy-d.sad)/d.Total); })
      .attr("r", function(d) { return totalScale(d.Total)/4; })
      .style("stroke", "white")
      .style("fill", "brown")
      .on("mouseover", function(d) {
            tooltip.html(d.country+'<br/>Total:'+d.Total+'<br/> Happy: '+d.happy+'-'+d.sad+'<br/>Love: '+d.love+'-'+d.hate);
            tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){
          return tooltip.style("visibility", "hidden");
      });

  nodes.append("text") 
      .attr("x", function(d,i) { return 6*hsScale((d.love-d.hate)/d.Total); })
      .attr("y", function(d,i) { return sheight - 6*hsScale((d.happy-d.sad)/d.Total); })
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("stroke", "black")
      .style("fill", "White")
      .attr("font-size", "20px")
      .text(function(d) { return d.country;});
 
  // var svg2 = d3.select("body").selectAll("#svg_bar1")

  // var bar1 = svg2.selectAll(".bar")
  //     .data(data)
  //   .enter().append("g")
  //     .attr("class", "bar");
  
  //  bar1.append("rect")
  //     .attr("x", function(d,i) { return i*bwidth;})
  //     .attr("y", function(d,i) { return sheight - 4*hsScale((d.happy-d.sad)/d.Total); })
  //     .attr("width", bwidth-2 )
  //     .attr("height", function(d) {return 4*hsScale((d.happy-d.sad)/d.Total); });

  // bar1.append("text") 
  //     .attr("transform", "rotate(-90)")
  //     // .attr("x", function(d,i) { return i*bwidth;})
  //     // .attr("y", function(d,i) { return sheight - 1*hsScale((d.happy-d.sad)/d.Total);} )
  //     .attr("dy", "0.35em")
  //     .text(function(d) { return d.country; })
  //     .on("mouseover", function(d) {
  //           tooltip.html(d.country+'<br/>Total:'+d.Total+'<br/> Happy: '+d.happy+'-'+d.sad+'<br/>Love: '+d.love+'-'+d.hate);
  //           tooltip.style("visibility", "visible");
  //     })
  //     .on("mousemove", function() {
  //         return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
  //     })
  //     .on("mouseout", function(){
  //         return tooltip.style("visibility", "hidden");
  //     });
  });


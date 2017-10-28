

mydata = d3.csv("data1.csv", function(data) {
    data.forEach(function(d) {
        Total = +d.Total;
        country = d["country"];
        happy = +d.happy;
        hate = +d.hate;
        love = +d.love;
        sad = +d.sad;
    });
    console.log(data);

    var hsScale = d3.scale.linear()
      .domain([0,0.15]).range([0,100]);

    var totalScale = d3.scale.log()
      .domain([10, 500000])
      .range([0, 100]);

    var color = d3.scale.ordinal()
        .domain([0,0.15])
        .range(["red", "white", "green"]);


    var svg = d3.select("body").selectAll("#svg_bubble1"),
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var bwidth = 20;
    var sheight =700;
    var swidth =700;

    bubble1 = svg.selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("cy", function(d) {return sheight - 6*hsScale((d.happy-d.sad)/d.Total); })
        .attr("cx", function(d, i) {return  6*hsScale((d.love-d.hate)/d.Total);})
        .attr("r", function(d) { return totalScale(d.Total)/4; })
        .style("stroke", "white")
        .style("fill", "brown");

    bubble1.append("text") 
        .attr("x", function(d,i) { return  6*hsScale((d.love-d.hate)/d.Total);})
        .attr("y", function(d,i) { return sheight - 6*hsScale((d.happy-d.sad)/d.Total);})
        .style("stroke", "black")
        .style("fill", "White")
        .text(function(d) { return d.country+((d.happy-d.sad)/d.Total); });


  //   var svg1 = d3.select("body").selectAll("#svg_bar1");

  //   bar1 = svg1.selectAll(".bar")
  //       .data(data)
  //     .enter().append("rect")
  //       .attr("class", "bar")
  //       .attr("x", function(d,i) { return i*bwidth;})
  //       .attr("y", function(d,i) { return sheight - 4*hsScale((d.happy-d.sad)/d.Total); })
  //       .attr("width", bwidth-2 )
  //       .attr("height", function(d) {return 4*hsScale((d.happy-d.sad)/d.Total); });

  //   bar1.append("text") 
  //       //.attr("transform", "rotate(-90)")
  //       .attr("x", function(d,i) { return i*bwidth;})
  //       .attr("y", 100)
  //       .attr("dy", "0.5em")
  //       .text(function(d) { return d.country; });
  });

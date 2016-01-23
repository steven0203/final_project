

var margin = {top: 40, right: 20, bottom: 30, left: 40},
	width = 960 ,
	height = 500 ;

var formatPercent = d3.format("");

var BarX= d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var BarY = d3.scale.linear()
	.range([height, 0]);

	var xAxis = d3.svg.axis()
.scale(BarX)
	.orient("bottom");

	var yAxis = d3.svg.axis()
.scale(BarY)
	.orient("left");

var tip = d3.tip()
	.attr('class', 'd3-tip')
.offset([-10, 0])
	.html(function(d) {
			return "<strong>年齡:</strong> <span style='color:red'>" + d.age + "</span>";
			})
function initialBarSvg(position)
{
	var svg = d3.select("body").append("svg")
	.attr("width", 1000)
	.attr("height", 600)
	.style(position)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	return svg;
}

function drawBar(file,svg){

svg.call(tip);

d3.csv(file, type, function(error, data) {
		BarX.domain(data.map(function(d) { return d.year; }));
		BarY.domain([0, d3.max(data, function(d) { return d.age; })]);

		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("年齡");

		svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return BarX(d.year); })
		.attr("width", BarX.rangeBand())
		.attr("y", function(d) { return BarY(d.age); })
		.attr("height", function(d) { return height - BarY(d.age); })
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)

});



function type(d) {
	d.age = +d.age;
	return d;
}
	return svg;
}

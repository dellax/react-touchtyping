import React from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

export default class Statistics extends React.Component {
	constructor(props) {
		super(props);
		this.stats = props.stats;
		this.labels = [];
		for (let i = 0; i < this.stats.wpmList.length; i++) {
			this.labels.push(String(i*3));
		}
	}

	componentDidMount() {
		let canvas = ReactDOM.findDOMNode(this.refs.chart1);
    let ctx = canvas.getContext('2d');

    let data1 = {
	    labels: this.labels,
	    datasets: [
	      {
          label: "WPM",

          // Boolean - if true fill the area under the line
          fill: false,

          // Tension - bezier curve tension of the line. Set to 0 to draw straight lines connecting points
          // Used to be called "tension" but was renamed for consistency. The old option name continues to work for compatibility.
          lineTension: 0.1,

          // String - the color to fill the area under the line with if fill is true
          backgroundColor: "rgba(75,192,192,0.4)",

          // String - Line color
          borderColor: "rgba(75,192,192,1)",

          // String - cap style of the line. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
          borderCapStyle: 'butt',

          // Array - Length and spacing of dashes. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
          borderDash: [],

          // Number - Offset for line dashes. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
          borderDashOffset: 0.0,

          // String - line join style. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
          borderJoinStyle: 'miter',

          // The properties below allow an array to be specified to change the value of the item at the given index

          // String or Array - Point stroke color
          pointBorderColor: "rgba(75,192,192,1)",

          // String or Array - Point fill color
          pointBackgroundColor: "#fff",

          // Number or Array - Stroke width of point border
          pointBorderWidth: 1,

          // Number or Array - Radius of point when hovered
          pointHoverRadius: 5,

          // String or Array - point background color when hovered
          pointHoverBackgroundColor: "rgba(75,192,192,1)",

          // String or Array - Point border color when hovered
          pointHoverBorderColor: "rgba(220,220,220,1)",

          // Number or Array - border width of point when hovered
          pointHoverBorderWidth: 2,

          // Number or Array - the pixel size of the point shape. Can be set to 0 to not render a circle over the point
          // Used to be called "radius" but was renamed for consistency. The old option name continues to work for compatibility.
          pointRadius: 1,

          // Number or Array - the pixel size of the non-displayed point that reacts to mouse hover events
          //
          // Used to be called "hitRadius" but was renamed for consistency. The old option name continues to work for compatibility.
          pointHitRadius: 10,

          // The actual data
          data: this.stats.wpmList,

          // String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used. First id is y-axis-0
          yAxisID: "y-axis-0",
	      }
	    ]
		};

		let wpmChart = new Chart(ctx, {
		  type: 'line',
		  data: data1,
		  options: {
	      xAxes: [{
          display: true
	      }]
		  }
		});



		let canvas2 = ReactDOM.findDOMNode(this.refs.chart2);
  	let ctx2 = canvas2.getContext('2d');
  	let incorrectWordsCount = this.stats.incorrectWords.length;
  	let correctWordsCount = this.stats.wordsTyped - incorrectWordsCount;
  	let data = {
		    labels: [
	        "Correct words",
	        "Incorrect words",
		    ],
		    datasets: [
	        {
            data: [correctWordsCount, incorrectWordsCount],
            backgroundColor: [
            	"#36A2EB",
              "#FF6384"
            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384"
            ]
	        }
	      ]
		};
		let myDoughnutChart = new Chart(ctx2, {
		    type: 'doughnut',
		    data: data
		});
	}

	

	render() {
		return (
			<div className="graf-test">
				<canvas ref="chart1"/>
				<canvas ref="chart2"/>
			</div>
		)
	}
}
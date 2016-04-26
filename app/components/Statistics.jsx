import React from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

export default class Statistics extends React.Component {
	constructor(props) {
		super(props);
		this.stats = props.stats;
	}

	componentDidMount() {
		let canvas = ReactDOM.findDOMNode(this.refs.chart1);
    let ctx = canvas.getContext('2d');


    var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		        datasets: [{
		            label: '# of Votes',
		            data: [12, 19, 3, 5, 2, 3]
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});



		let canvas2 = ReactDOM.findDOMNode(this.refs.chart2);
  	let ctx2 = canvas2.getContext('2d');
  	let incorrectWordsCount = this.stats.incorrectWords.length;
  	let correctWordsCount = this.stats.wordsTyped - incorrectWordsCount;
  	var data = {
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
		var myDoughnutChart = new Chart(ctx2, {
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
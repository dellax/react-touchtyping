import React from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

export default class Statistics extends React.Component {
	constructor(props) {
		super(props);
		
	}

	componentDidMount() {
		let canvas = ReactDOM.findDOMNode(this.refs.graph);
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
	}

	render() {
		return (
			<div className="graf-test">
				<canvas  ref="graph"/>
			</div>
		)
	}
}
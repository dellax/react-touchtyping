import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {secondsElapsed: 0, stats: this.props.stats, runTimer: false};
	}
	tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
  runTimer() {
    	this.timer = setInterval(this.tick.bind(this), 1000);
  }
  stopTimer() {
  	clearInterval(this.timer);
  }
  componentWillUnmount() {
    this.stopTimer();
  }
	render() {
		if (this.props.stats.runTimer && !this.state.runTimer) {
			this.state.runTimer = true;
			this.runTimer();
		} else if (!this.props.stats.runTimer && this.state.runTimer) {
			this.stopTimer();
		}
		return (
			<div>Stats: time {this.state.secondsElapsed} </div>
		)	
	}
}
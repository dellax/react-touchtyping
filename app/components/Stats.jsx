import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {secondsElapsed: 0, stats: this.props.stats, timerStarted: false};
	}
	tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
  runTimer() {
    	this.timer = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
	render() {
		if (this.props.stats.startTimer && !this.state.timerStarted) {
			this.state.timerStarted = true;
			this.runTimer();
		}
		return (
			<div>Stats: time {this.state.secondsElapsed} </div>
		)	
	}
}
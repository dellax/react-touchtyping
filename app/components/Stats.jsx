import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		let stats = {wpm: 0}
		this.state = {secondsElapsed: 0, stats: stats, runTimer: false};
	}
	tick() {
		let wpm = Math.round(this.props.stats.wordsTyped / (this.state.secondsElapsed / 60.0));
		let stats = this.state.stats;
		stats.wpm = wpm;
    this.setState({secondsElapsed: this.state.secondsElapsed + 1, stats: stats});
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
			<div>Stats: time: {this.state.secondsElapsed}, WPM: {this.state.stats.wpm}</div>
		)	
	}
}
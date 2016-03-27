import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		let stats = {wpm: 0}
		this.state = {secondsElapsed: 0, stats, runTimer: false};
	}

	tick() {
		let wpm = this.countWpm();
		let stats = {wpm};
		this.setState({secondsElapsed: this.state.secondsElapsed + 1, stats});
	}

	countWpm() {
		let correctWords = this.props.stats.correctWords;
		let secondsElapsed = this.state.secondsElapsed;
		if (secondsElapsed === 0) return 0;
		let wpm = Math.round(correctWords / (secondsElapsed / 60.0));
		return wpm;
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
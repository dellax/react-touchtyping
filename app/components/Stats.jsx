import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		this.timerRunning = false;
		this.state = {secondsElapsed: 0, wpm: 0};
	}

	tick() {
		let wpm = this.countWpm();
		this.setState({secondsElapsed: this.state.secondsElapsed + 1, wpm});
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
		if (this.props.stats.runTimer && !this.timerRunning) {
			this.timerRunning = true;
			this.runTimer();
		} else if (!this.props.stats.runTimer && this.timerRunning) {
			this.stopTimer();
		}
		const {secondsElapsed, wpm} = this.state;
		return (
			<div>Stats: time: {secondsElapsed}, WPM: {wpm}</div>
		)
	}
}
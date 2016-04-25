import React from 'react';

export default class Stats extends React.Component {
	constructor(props) {
		super(props);
		this.timerRunning = false;
		this.state = {secondsElapsed: 0, wpm: 0, highestWpm: 0};
	}

	tick() {
		let {secondsElapsed, wpm, highestWpm} = this.state;
		wpm = this.countWpm();
		if (wpm > highestWpm) {
			highestWpm = wpm;
		}
		this.setState({secondsElapsed: secondsElapsed + 1, wpm, highestWpm});
	}

	countWpm() {
		let incorrectWordsCount = this.props.stats.incorrectWords.length;
		let correctWordsCount = this.props.stats.wordsTyped - incorrectWordsCount;
		let secondsElapsed = this.state.secondsElapsed;
		if (secondsElapsed === 0) return 0;
		let wpm = Math.round(correctWordsCount / (secondsElapsed / 60.0));
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
		const {secondsElapsed, wpm, highestWpm} = this.state;
		return (
			<div className="touchtyping-stats">Time: {secondsElapsed}, WPM: {wpm}, Highest WPM: {highestWpm}</div>
		)
	}
}
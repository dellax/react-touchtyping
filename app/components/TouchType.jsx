import React, { PropTypes } from 'react';
import StatsBar from './StatsBar';
import ProgressBar from './ProgressBar';
import KeySuggestion from './KeySuggestion';

export default class TouchType extends React.Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.timerRunning = false;
		this.secondsElapsed = 0;
		this.stats = {
			secondsElapsed: 0,
			lettersTyped: 0,
			wordsTyped: 0,
			incorrectWords: [],
			incorrectLetters: [],
			currentWpm: 0,
			highestWpm: 0,
			wpmList: []
		};
		const parts = this.createInitialParts(props.text);
		this.state = {parts, input: ''};
	}

	createInitialParts(text) {
		let textSplitted = text.split(' ');
		let parts = [];
		for (let i = 0; i < textSplitted.length; i++) {
			let part = {
				id: i,
				text: textSplitted[i],
				className: "default"
			}
			parts.push(part);
		}
		parts[0].className = "current";
		return parts;
	}

	handleChange(e) {
		let {parts, input} = this.state;
		let {
			secondsElapsed,
			lettersTyped,
			wordsTyped,
			incorrectWords,
			incorrectLetters,
			currentWpm,
			highestWpm,
			wpmList
		} = this.stats;
		let i = this.index;
		if (!this.timerRunning) {
			this.runTimer();
			this.timerRunning = true;
		}

		input = e.target.value;
		if (input.endsWith(' ') && i < parts.length) {
			let part = input.slice(0, -1);
			if (part === parts[i].text) {
				parts[i].className = "correct";
			} else {
				parts[i].className = "incorrect";
				incorrectWords.push(parts[i].text);
			}
			if (i + 1 < parts.length) {
				parts[i + 1].className = "current";
			} else {
				this.stopTimer();
			}
			i++;
			input = '';
		}
		this.index = i;
		this.stats = {
			secondsElapsed,
			lettersTyped, 
			wordsTyped: i, 
			incorrectWords,
			incorrectLetters,
			currentWpm,
			highestWpm,
			wpmList
		};
		this.setState({parts, input});
	}

	tick() {
		let {
			secondsElapsed,
			lettersTyped,
			wordsTyped,
			incorrectWords,
			incorrectLetters,
			currentWpm,
			highestWpm,
			wpmList
		} = this.stats;
		let incorrectWordsCount = incorrectWords.length;
		let correctWordsCount = wordsTyped - incorrectWordsCount;

		currentWpm = this.countWpm(incorrectWordsCount, correctWordsCount, this.secondsElapsed);
		// for better results, count wpm after 5 seconds
		if (currentWpm > highestWpm && this.secondsElapsed > 4)
			highestWpm = currentWpm;
		// add wpm every 3 seconds
		if (this.secondsElapsed % 3 === 0) wpmList.push(currentWpm);
		this.secondsElapsed++;

		this.stats = {
			secondsElapsed: this.secondsElapsed,
			lettersTyped, 
			wordsTyped, 
			incorrectWords,
			incorrectLetters,
			currentWpm,
			highestWpm,
			wpmList
		};
	}

	runTimer() {
		this.timer = setInterval(this.tick.bind(this), 1000);
	}

	stopTimer() {
		clearInterval(this.timer);
	}

	countWpm(incorrectWordsCount, correctWordsCount, secondsElapsed) {
		if (secondsElapsed === 0) return 0;
		return Math.round(correctWordsCount / (secondsElapsed / 60.0));
	}

	renderStatistics() {
		return (
			<div> </div>
		)
	}

	renderTypingApp() {
		const {parts, input} = this.state;
		const completed = 100 / parts.length * this.index;
		return (
			<div className="tt-app">
				<div className="tt-app-main">
					<StatsBar stats={this.stats} />
					<div className="tt-input-text">
						{parts.map((part) => {
							return <span key={part.id}><span className={part.className}>{`${part.text}`}</span> </span>
						})}
					</div>
					<ProgressBar completed={completed} />
					<input
						type="text"
						value={input}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
			</div>
		)
	}

	render() {
		return this.renderTypingApp();
	}
}

TouchType.propTypes = {
	text: PropTypes.string.isRequired
};
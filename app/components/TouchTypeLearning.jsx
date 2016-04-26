import React, { PropTypes } from 'react';
import StatsBar from './StatsBar';
import ProgressBar from './ProgressBar';
import KeySuggestion from './KeySuggestion';
import Statistics from './Statistics';

export default class TouchType extends React.Component {
	constructor(props) {
		super(props);
		this.currentLetterIndex = 0;
		this.currentWordIndex = 0;
		this.isIncorrectWord = false;
		this.shiftKeyPressed = false;
		this.shiftLocation = 0;
		this.userInput = '';
		this.lastIncorrectLetterIndex = -1;
		this.timerRunning = false;
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
		this.wordsSplitted = props.text.split(' ');
		this.newLineIndexes = this.createNewLineIndexes(props.text, props.maxCharsPerLine);
		this.currentLineIndex = 0;
		const letterTextParts = this.createInitialParts(props.text);
		this.keyInfo = {
			pressedKey: '',
			expectedKey: '',
			nextKey: letterTextParts[0].text,
			shiftKeyPressed: this.shiftKeyPressed,
			shiftLocation: this.shiftLocation
		}
		this.state = {letterTextParts, input: '', typingFinished: false};
	}

	createInitialParts(text) {
		let textSplitted = text.split('');
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

	createNewLineIndexes(text, maxCharsPerLine) {
		// TODO add lines count?
		let textSplitted = text.split(' ');
		let currentIndex = 0;
		let currentLineLength = 0;
		let res = [0];
		for (let i = 0; i < textSplitted.length-1; i++) {
			if (currentLineLength + textSplitted[i+1].length >= maxCharsPerLine) {
				currentIndex += currentLineLength;
				currentLineLength = 0;
				res.push(currentIndex);
			}
			currentLineLength += textSplitted[i].length + 1; // space
		}
		return res;
	}

	handleOnKeyUp(e) {
		const SHIFT_KEY = 16;
		if (e.keyCode === SHIFT_KEY) this.shiftLocation = e.location;
		this.shiftKeyPressed = e.shiftKey;
	}

	handleChange(e) {
		let {letterTextParts, input, typingFinished} = this.state;
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
		let i = this.currentLetterIndex;
		if (!this.timerRunning) {
			this.runTimer();
			this.timerRunning = true;
		}
		input = e.target.value;
		this.keyInfo.shiftKeyPressed = this.shiftKeyPressed;
		this.keyInfo.shiftLocation = this.shiftLocation;

		if (i < letterTextParts.length) {
			let part = input.charAt(input.length-1);
			this.keyInfo.expectedKey = letterTextParts[i].text;
			this.keyInfo.pressedKey = part;
			if (part === letterTextParts[i].text) {
				this.userInput += part;
				if (part === ' ') { // new word
					// check for new line
					if (i === this.newLineIndexes[this.currentLineIndex+1]-1) {
						this.currentLineIndex++;
						this.userInput = '';
					}
					if (this.isIncorrectWord) {
						incorrectWords.push(this.wordsSplitted[this.currentWordIndex]);
					}
					this.isIncorrectWord = false;
					this.currentWordIndex++;
				}
				letterTextParts[i].className = "correct";
				if (i + 1 < letterTextParts.length) {
					letterTextParts[i + 1].className = "current";
					this.keyInfo.nextKey = letterTextParts[i + 1].text;
				} else {
					typingFinished = true;
					this.stopTimer();
					this.keyInfo.pressedKey = '';
				}
				i++;
				if (this.lastIncorrectLetterIndex != -1) {
					let j = this.lastIncorrectLetterIndex;
					letterTextParts[j].className = "incorrect";
					this.lastIncorrectLetterIndex = -1;
				}
			} else {
				// to prevent adding incorrect letter more time
				if (this.lastIncorrectLetterIndex != i) 
					incorrectLetters.push(letterTextParts[i].text);
				this.lastIncorrectLetterIndex = i;
				this.isIncorrectWord = true;
			}
		} else {
			
			
		}

		this.currentLetterIndex = i;
		this.stats = {
			secondsElapsed, 
			lettersTyped: i, 
			wordsTyped: this.currentWordIndex, 
			incorrectWords,
			incorrectLetters,
			currentWpm,
			highestWpm,
			wpmList
		};
		this.setState({letterTextParts, input: this.userInput, typingFinished});
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

		currentWpm = this.countWpm(incorrectWordsCount, correctWordsCount, secondsElapsed);
		// for better results, count wpm after 5 seconds
		if (currentWpm > highestWpm && secondsElapsed > 4)
			highestWpm = currentWpm;
		// add wpm every 3 seconds
		if (secondsElapsed % 3 === 0) wpmList.push(currentWpm);
		secondsElapsed++;

		this.stats = {
			secondsElapsed, 
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

	renderTypingApp() {
		const {letterTextParts, input, typingFinished} = this.state;
		const completed = 100 / letterTextParts.length * this.currentLetterIndex;

		const fromIndex = this.newLineIndexes[this.currentLineIndex];
		const toIndex = this.newLineIndexes[this.currentLineIndex+1];

		return (
			<div className="tt-app">
				<div className="tt-app-main">
					<StatsBar stats={this.stats}/>
					<div className="tt-input-text-learning">
						{letterTextParts.slice(fromIndex, toIndex).map((part) => {
							return <span className={part.className} key={part.id}>{part.text}</span>
						})}
					</div>
					<ProgressBar completed={completed} />
					<textarea
						rows="4"
						value={input}
						onChange={this.handleChange.bind(this)}
						onKeyDown={this.handleOnKeyUp.bind(this)}
					/>
				</div>
				<KeySuggestion keyInfo={this.keyInfo} />
			</div>
		)
	}

	render() {
		if (this.state.typingFinished === false) {
			return this.renderTypingApp();
		} else {
			// TODO add params to statistics
			// add some effect ...
			console.log(this.stats.wpmList);
			return <Statistics stats={this.stats} />
		}
	}
}

TouchType.propTypes = {
	text: PropTypes.string.isRequired,
	maxCharsPerLine: PropTypes.number
};

TouchType.defaultProps = {
	maxCharsPerLine: 48
}

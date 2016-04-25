import React, { PropTypes } from 'react';
import Stats from './Stats';
import ProgressBar from './ProgressBar';
import KeySuggestion from './KeySuggestion';

export default class TouchType extends React.Component {
	constructor(props) {
		super(props);
		this.currentLetterIndex = 0;
		this.currentWordIndex = 0;
		this.shiftKeyPressed = false;
		this.shiftLocation = 0;
		this.userInput = '';
		this.lastIncorrectLetterIndex = -1;
		this.stats = {
			runTimer: false,
			lettersTyped: 0,
			wordsTyped: 0,
			incorrectWords: []
		};
		const letterTextParts = this.createInitialParts(props.text);
		this.newLineIndexes = this.createNewLineIndexes(props.text, props.maxCharsPerLine);
		this.currentLineIndex = 0;
		this.keyInfo = {
			pressedKey: '',
			expectedKey: '',
			nextKey: letterTextParts[0].text,
			shiftKeyPressed: this.shiftKeyPressed,
			shiftLocation: this.shiftLocation
		}
		this.state = {letterTextParts, input: ''};
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
		let {letterTextParts, input} = this.state;
		let {runTimer, lettersTyped, wordsTyped, incorrectWords} = this.stats;
		let i = this.currentLetterIndex;
		runTimer = true;
		input = e.target.value;
		// TODO add mistakes and refactor
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
					this.currentWordIndex++;
				}
				letterTextParts[i].className = "correct";
				if (i + 1 < letterTextParts.length) {
					letterTextParts[i + 1].className = "current";
					this.keyInfo.nextKey = letterTextParts[i + 1].text;
				} else {
					runTimer = false;
					this.keyInfo.pressedKey = '';
				}
				i++;
				if (this.lastIncorrectLetterIndex != -1) {
					let j = this.lastIncorrectLetterIndex;
					letterTextParts[j].className = "incorrect";
					this.lastIncorrectLetterIndex = -1;
				}
			} else {
				this.lastIncorrectLetterIndex = i;
			}
		} else {
			// TODO show graphs and stats, save to DB
			console.log('end');
		}

		this.currentLetterIndex = i;
		this.stats = {
			runTimer, 
			lettersTyped: i, 
			wordsTyped: this.currentWordIndex, 
			incorrectWords
		};
		this.setState({letterTextParts, input: this.userInput});
	}

	render() {
		const {letterTextParts, input} = this.state;
		const completed = 100 / letterTextParts.length * this.currentLetterIndex;

		const fromIndex = this.newLineIndexes[this.currentLineIndex];
		const toIndex = this.newLineIndexes[this.currentLineIndex+1];

		return (
			<div className="tt-app">
				<div className="tt-app-main">
					<Stats stats={this.stats}/>
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
}

TouchType.propTypes = {
	text: PropTypes.string.isRequired,
	maxCharsPerLine: PropTypes.number
};

TouchType.defaultProps = {
	maxCharsPerLine: 48
}

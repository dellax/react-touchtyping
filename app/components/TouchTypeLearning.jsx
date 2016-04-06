import React, { PropTypes } from 'react';
import Stats from './Stats';
import ProgressBar from './ProgressBar';
import KeySuggestion from './KeySuggestion';

export default class TouchType extends React.Component {
	constructor(props) {
		super(props);
		this.currentLetterIndex = 0;
		this.currentWordIndex = 0;
		this.shiftLocation = 0;
		this.shiftKeyPressed = false;
		this.userInput = '';
		this.lastIncorrectLetterIndex = -1;
		this.stats = {
			runTimer: false,
			lettersTyped: 0,
			wordsTyped: 0,
			incorrectWords: []
		};
		const letterTextParts = this.createInitialParts(props.text);
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

	handleOnKeyUp(e) {
		const SHIFT_KEY = 16;
		if (e.keyCode === SHIFT_KEY) this.shiftLocation = e.location;
		this.shiftKeyPressed = e.shiftKey;
	}

	handleChange(e) {
		console.log(this.shiftLocation);
		console.log(this.shiftKeyPressed);
		let {letterTextParts, input} = this.state;
		let {runTimer, lettersTyped, wordsTyped, incorrectWords} = this.stats;
		let i = this.currentLetterIndex;
		runTimer = true;
		input = e.target.value;
		// TODO add mistakes and refactor
		if (i < letterTextParts.length) {
			let part = input.charAt(input.length-1);

			if (part === letterTextParts[i].text) {
				if (part === ' ') this.currentWordIndex++;
				this.userInput += part;
				letterTextParts[i].className = "correct";

				if (i + 1 < letterTextParts.length) {
					letterTextParts[i + 1].className = "current";
				} else {
					runTimer = false;
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
		const completed = 100 / letterTextParts.length * this.index;
		return (
			<div className="tt-app">
				<div className="tt-app-main">
					<Stats stats={this.stats}/>
					<div className="tt-input-text-learning">
						{letterTextParts.map((part) => {
							return <span className={part.className} key={part.id}>{`${part.text}`}</span>
						})}
					</div>
					<ProgressBar completed={completed} />
					<input
						type="text"
						value={input}
						onChange={this.handleChange.bind(this)}
						onKeyDown={this.handleOnKeyUp.bind(this)}
					/>
					<KeySuggestion pressedKey={'k'} />
				</div>
			</div>
		)
	}
}

TouchType.propTypes = {
	text: PropTypes.string.isRequired
};

import React, { PropTypes } from 'react';
import Stats from './Stats';
import ProgressBar from './ProgressBar';
import KeySuggestion from './KeySuggestion';

export default class TouchType extends React.Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.stats = {
			runTimer: false, 
			wordsTyped: 0,
			incorrectWords: []
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
		let {runTimer, wordsTyped, incorrectWords} = this.stats;
		let i = this.index;
		runTimer = true;
		wordsTyped = i;
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
				runTimer = false;
			}
			i++;
			input = '';
		}
		this.index = i;
		this.stats = {runTimer, wordsTyped: i, incorrectWords};
		this.setState({parts, input});
	}

	render() {
		const {parts, input} = this.state;
		const completed = 100 / parts.length * this.index;
		return (
			<div className="tt-app">
				<div className="tt-app-main">
					<Stats stats={this.stats}/>
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
}

TouchType.propTypes = {
	text: PropTypes.string.isRequired
};
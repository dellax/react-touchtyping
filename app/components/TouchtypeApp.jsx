import React from 'react';
import Stats from './Stats';
import ProgressBar from './ProgressBar';

export default class TouchtypeApp extends React.Component {
	constructor(props) {
		super(props);
		let parts = this.createInitialParts(props.text);
		let stats = {runTimer: false, wordsTyped: 0, correctWords: 0, incorrectWords: 0};
		this.state = {parts: parts, index: 0, input: "", stats: stats};
	}

	createInitialParts(text) {
		let textSplitted = text.split(" ");
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
		let {parts, index, input, stats} = this.state;
		let {runTimer, wordsTyped, correctWords, incorrectWords} = this.state.stats;
		runTimer = true;
		wordsTyped = index;
		input = e.target.value;
		if (input.charAt(input.length - 1) === " " && index < parts.length) {
			let part = input.substring(0, input.length - 1);
			if (part === parts[index].text) {
				parts[index].className = "correct";
				correctWords++;
			} else {
				parts[index].className = "incorrect";
				incorrectWords++;
			}
			if (index + 1 < parts.length) {
				parts[index + 1].className = "current";
			} else {
				runTimer = false;
			}
			index++;
			input = "";
			wordsTyped = index;
		}
		stats = {runTimer, wordsTyped, correctWords, incorrectWords};
		return this.setState({parts, index, input, stats});
	}

	render() {
		const {parts, index, input, stats} = this.state;
		return (
			<div className="tt-app">
			<Stats stats={stats}/>
			<div className="tt-input-text">
			{parts.map((part) => {
				return <span className={part.className} key={part.id}>{part.text} </span>
			})}
			</div>
			<ProgressBar completed={100/parts.length * index} />
			<input
			type="text"
			value={input}
			onChange={this.handleChange.bind(this)}
			/>
			</div>
			)
	}
}

TouchtypeApp.propTypes = {
	text: React.PropTypes.string.isRequired
};
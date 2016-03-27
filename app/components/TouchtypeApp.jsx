import React from 'react';
import Stats from './Stats';

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
		if (input.charAt(input.length - 1) === " ") {
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
			stats = {runTimer, wordsTyped, correctWords, incorrectWords};
		}
		return this.setState({parts, index, input, stats});
	}

	render() {
		return (
			<div className="tt-app">
				<Stats stats={this.state.stats}/>
				<div className="tt-input-text">
					{this.state.parts.map((part) => {
						return <span className={part.className} key={part.id}>{part.text} </span>
					})}
				</div>
				<input
					type="text"
					value={this.state.input}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		)
	}
}

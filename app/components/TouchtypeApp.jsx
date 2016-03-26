import React from 'react';
import Stats from './Stats';

export default class TouchtypeApp extends React.Component {
	constructor(props) {
		super(props);
		let textSplitted = props.text.split(" ");
		let parts = this.createInitialParts(textSplitted);
		let stats = {startTimer: false};
		this.state = {parts: parts, index: 0, input: "", stats: stats};
	}
	createInitialParts(textArray) {
		let parts = [];
		for (let i = 0; i < textArray.length; i++) {
			let part = {
				id: i,
				text: textArray[i],
				className: "default"
			}
			parts.push(part);
		}
		parts[0].className = "current";
		return parts;
	}
	handleChange(e) {
		let stats = {startTimer: true};
		let part = e.target.value;
		if (part.charAt(part.length-1) === " ") {
			let index = this.state.index;
			let parts = this.state.parts;
			part = part.substring(0, part.length-1);
			if (part === parts[index].text) {
				parts[index].className = "correct";
			} else {
				parts[index].className = "incorrect";
			}
			if (index+1 < parts.length) {
				parts[index+1].className = "current";
			}
			return this.setState({parts: parts, index: this.state.index+1, input: "", stats: stats});
		}
		return this.setState({input: part, stats: stats});
	}
	render() {
		return (
			<div className="tt-app">
				<Stats stats={this.state.stats} />
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

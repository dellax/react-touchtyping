import React, { PropTypes } from 'react';
import Player from './Player';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const completed = this.props.completed;
		console.log(completed);
		return (
			<div className="game-cars">
				<Player completed={completed} />
				<Player completed={10} />
				<Player completed={10} />
			</div>
		)
	}
}

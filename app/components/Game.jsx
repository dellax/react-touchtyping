import React, { PropTypes } from 'react';
import Player from './Player';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		
		return (
			<div className="game-cars">
				<Player completed={1} />
				<Player completed={10} />
				<Player completed={30} />
			</div>
		)
	}
}

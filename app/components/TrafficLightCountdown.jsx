import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// TODO 
// timer on server from DB, not on client !!!!!!

export default class TrafficLightCountdown extends React.Component {
	constructor(props) {
		super(props);
		let countdown = props.countdown;
		this.state = {
			styles: [
				{ backgroundColor: 'red' },
				{ backgroundColor: 'black' },
				{ backgroundColor: 'black' }
			],
			isShown: true
		};
	}

	componentDidMount() {
		let countdown = this.props.countdown;
		this.tick(countdown);
	}

	componentWillReceiveProps(props) {
		let countdown = props.countdown;
		this.tick(countdown);
	}

	tick(countdown) {
		if (countdown === 4) {
			this.setState({
				styles: [
					{ backgroundColor: 'black' },
					{ backgroundColor: 'orange' },
					{ backgroundColor: 'black' }
				],
				isShown: true
			})
		} else if (countdown === 0) {
			this.setState({
				styles: [
					{ backgroundColor: 'black' },
					{ backgroundColor: 'black' },
					{ backgroundColor: 'green' }
				],
				isShown: true
			});
			this.setState({
				styles: this.state.styles,
				isShown: false
			});
		} else {
			this.setState({
				styles: [...this.state.styles],
				isShown: true
			});
		}
	}

	showCountdown() {
		const styles = this.state.styles;
		const countdown = this.props.countdown;

		return (
			<div className="trafficlight-countdown">
				<div className="trafficlight-circle" style={styles[0]}></div>
				<div className="trafficlight-circle" style={styles[1]}></div>
				<div className="trafficlight-circle" style={styles[2]}></div>
				<span className="trafficlight-text">Hra začne za {countdown} s</span>
			</div>
		)
	}

	render() {
		let component = this.state.isShown ? this.showCountdown() : false;

		return (
			<ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {component}
      </ReactCSSTransitionGroup>
		)
	}
}

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TrafficLightCountdown extends React.Component {
	constructor(props) {
		super(props);
		this.timeLeft = 5;
		this.state = {
			styles: [
				{ backgroundColor: 'black' },
				{ backgroundColor: 'black' },
				{ backgroundColor: 'black' }
			],
			isShown: true
		};
	}

	componentDidMount() {
		this.runTimer();
	}

	tick() {
		this.timeLeft--;
		if (this.timeLeft === 2) {
			this.setState({
				styles: [
					{ backgroundColor: 'red' },
					{ backgroundColor: 'black' },
					{ backgroundColor: 'black' }
				],
				isShown: true
			})
		} else if (this.timeLeft === 1) {
			this.setState({
				styles: [
					{ backgroundColor: 'black' },
					{ backgroundColor: 'yellow' },
					{ backgroundColor: 'black' }
				],
				isShown: true
			});
		} else if (this.timeLeft === 0) {
			this.setState({
				styles: [
					{ backgroundColor: 'black' },
					{ backgroundColor: 'black' },
					{ backgroundColor: 'green' }
				],
				isShown: true
			});
			this.stopTimer();
			this.setState({
				styles: this.state.styles,
				isShown: false
			});
			if (this.props.onComplete) {
				this.props.onComplete();
			}
		} else {
			this.setState({
				styles: [...this.state.styles],
				isShown: true
			});
		}
	}

	runTimer() {
		this.timer = setInterval(this.tick.bind(this), 1000);
	}

	stopTimer() {
		clearInterval(this.timer);
	}

	showCountdown() {
		const styles = this.state.styles;
		return (
			<div className="trafficlight-countdown">
				<div className="trafficlight-circle" style={styles[0]}></div>
				<div className="trafficlight-circle" style={styles[1]}></div>
				<div className="trafficlight-circle" style={styles[2]}></div>
				<span className="trafficlight-text">Hra začne za {this.timeLeft} s</span>
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

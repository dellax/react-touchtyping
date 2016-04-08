import React, { PropTypes } from 'react';

export const RightHand = ({index}) => {
	const i = index - 1;
	const styles = [
		{top: '63px', left: '0px', visibility: 'visible'},
		{top: '5px', left: '63px', visibility: 'visible'},
		{top: '3px', left: '92px', visibility: 'visible'},
		{top: '22px', left: '113px', visibility: 'visible'},
		{top: '41px', left: '126px', visibility: 'visible'},
	]
	return (
		<div className="right-hand" >
			<div className="circle" style={styles[i]}></div>
		</div>
	)
}

export const LeftHand = ({index}) => {
	const i = index - 1;
	const styles = [
		{top: '40px', left: '0px', visibility: 'visible'},
		{top: '22px', left: '15px', visibility: 'visible'},
		{top: '3px', left: '35px', visibility: 'visible'},
		{top: '5px', left: '64px', visibility: 'visible'},
		{top: '63px', left: '127px', visibility: 'visible'},
	]
	return (
		<div className="left-hand">
			<div className="circle" style={styles[i]}></div>
		</div>
	)
}
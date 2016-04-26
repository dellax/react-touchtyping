import React from 'react';

const StatsBar = ({stats}) => {
	let {
		secondsElapsed,
		lettersTyped,
		wordsTyped,
		incorrectWords,
		incorrectLetters,
		currentWpm,
		highestWpm,
		wpmList
	} = stats;

	return (
		<div className="touchtyping-stats">Time: {secondsElapsed}, WPM: {currentWpm}, Highest WPM: {highestWpm}</div>
	)
}

export default StatsBar;
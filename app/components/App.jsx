import React from 'react';
import TouchTypeLearning from './TouchTypeLearning.jsx';
import TouchTypeGaming from './TouchTypeGaming.jsx';
import TouchType from './TouchType.jsx';
import Statistics from './Statistics.jsx';
import Game from './Game.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured.`.replace(/(\n)+/g, '');

let textLearning = `aaaa bbcc eeee ffff jjjj kkkk
mmmm pppp`.replace(/(\n)+/g, '');

let text2 = 'aa ll kk dd jj ';

let stats = {
	secondsElapsed: 50,
	lettersTyped: 150,
	wordsTyped: 30,
	incorrectWords: ['test', 'amater', 'touch', 'typer'],
	incorrectLetters: ['a', 'b', 'c'],
	currentWpm: 80,
	highestWpm: 120,
	wpmList: [0, 100, 110, 105, 80, 90]
}

const App = () => (
	<div id="page-wrap">
		<TouchTypeGaming text={text} />
	</div>	
)

export default App;

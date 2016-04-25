import React from 'react';
import TouchTypeLearning from './TouchTypeLearning.jsx';
import TouchType from './TouchType.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured. What suffering will have 
to be endured before the workers realize that? It was from 
a man in Arizona. What suffering will have to be endured.`.replace(/(\n)+/g, '');

let textLearning = `aaaa bbcc eeee ffff jjjj kkkk
mmmm pppp`.replace(/(\n)+/g, '');

let text2 = 'aa ll kk dd jj ';

const App = () => (
	<div id="page-wrap">
		<TouchTypeLearning text={text}  />
	</div>	
)

export default App;

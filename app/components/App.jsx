import React from 'react';
import TouchTypeLearning from './TouchTypeLearning.jsx';
import TouchType from './TouchType.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured.`.replace(/(\n)+/g, '');

let textLearning = `aa bb ll ff 
jj kk cc ss 
dd ee dd ff 
qq ee bb mm`.split('\n');

let text2 = 'aa ll kk dd jj ';

const App = () => (
	<div id="page-wrap">
		<TouchType text={text} />
	</div>	
)

export default App;

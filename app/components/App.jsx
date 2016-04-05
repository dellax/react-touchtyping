import React from 'react';
import TouchTypeLearning from './TouchTypeLearning.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured.`.replace(/(\n)+/g, '');

const App = () => (
	<div id="page-wrap">
		<TouchTypeLearning text={text} />;
	</div>	
)

export default App;

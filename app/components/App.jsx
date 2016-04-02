import React from 'react';
import TouchType from './TouchType.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured.`.replace(/(\n)+/g, '');

const App = () => (
	<div id="page-wrap">
		<TouchType text={text} />;
	</div>	
)

export default App;

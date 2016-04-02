import React from 'react';
import TouchtypeApp from './TouchtypeApp.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. What 
suffering will have to be endured.`.replace(/(\n)+/g, '');

const App = () => (
	<div>
		<TouchtypeApp text={text} />;
	</div>	
)

export default App;

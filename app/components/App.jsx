import React from 'react';
import TouchtypeApp from './TouchtypeApp.jsx';

let text = `What suffering will have to be endured before 
the workers realize that? It was from a man in Arizona. Test
 Test Test`

export default class App extends React.Component {
  render() {
    return <TouchtypeApp text={text} />;
  }
}

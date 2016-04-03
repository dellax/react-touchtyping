import React, { PropTypes } from 'react';

export default class KeySuggestion extends React.Component {
	constructor(props) {
		super(props);
		let keys = props.keyboardSettings.keys;
		this.keyMap = this.createKeyMap(keys);
		this.state = {keys: keys};
	}

	createKeyMap(keys) {
		let keyMap = new Map();
		let index = 0;
		for (let key of keys) {
			// TODO correct shift and finger
			switch(key.type) {
				case 'doubleKey':
					keyMap.set(key.top, {index, shift: "left"});
					keyMap.set(key.bottom, {index, shift: "left"});
					break;
				case 'textKey':
					keyMap.set(key.text, {index, shift: "left"});
					break;
				default:
					keyMap.set(key.char, {index, shift: "left"});
			}
			index++;
		}
		return keyMap;
	}

	higlightCorrectKey(key) {
		// TODO
	}

	higlightIncorrectKey(key) {
		// TODO
	}

	render() {
		const keys = this.state.keys;
		return (
			<div className="keysuggestion">
				<div className="keyboard">
					{keys.map((key) => {
						switch(key.type) {
							case 'doubleKey':
								return <DoubleKey key={key.id} data={key} />;
								break;
							case 'textKey':
								return <TextKey key={key.id} data={key} />;
								break;
							default:
								return <DefaultKey key={key.id} data={key} />;
						}
					})}
				</div>
			</div>
		)
	}
}

const DefaultKey = ({data}) => (
	<div className="key">{data.char}</div>
)

DefaultKey.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.string,
		char: PropTypes.string
	})
}

const DoubleKey = ({data}) => {
	// key = {id: 0, type="doubleKey", top:'z', bottom: 'x'}
	return (
		<div className="key">
			<div className='top'>{data.top}</div>
			<div className='bottom'>{data.bottom}</div>
		</div>
	)
}

DoubleKey.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.string,
		top: PropTypes.string,
		bottom: PropTypes.string
	})
}

const TextKey = ({data}) => {
	return (
		<div className={`key ${data.className}`}>
			<span>{data.text}</span>
		</div>
	)
}

TextKey.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.string,
		text: PropTypes.string,
		className: PropTypes.string
	})
}

const keyboardSettings = {
	layout: 'ansi', 
	language: 'slovak QWERTY',
	keys: []
};
keyboardSettings.keys = [
	// first row
	{id: 0, type: 'doubleKey', top: '°', bottom: ';'},
	{id: 1, type: 'doubleKey', top: '1', bottom: '+'},
	{id: 2, type: 'doubleKey', top: '2', bottom: 'ľ'},
	{id: 3, type: 'doubleKey', top: '3', bottom: 'š'},
	{id: 4, type: 'doubleKey', top: '4', bottom: 'č'},
	{id: 5, type: 'doubleKey', top: '5', bottom: 'ť'},
	{id: 6, type: 'doubleKey', top: '6', bottom: 'ž'},
	{id: 7, type: 'doubleKey', top: '7', bottom: 'ý'},
	{id: 8, type: 'doubleKey', top: '8', bottom: 'á'},
	{id: 9, type: 'doubleKey', top: '9', bottom: 'í'},
	{id: 10, type: 'doubleKey', top: '0', bottom: 'é'},
	{id: 11, type: 'doubleKey', top: '%', bottom: '='},
	{id: 12, type: 'doubleKey', top: 'ˇ', bottom: '´'},
	{id: 13, type: 'textKey', text: 'backspace', className: 'key-delete'},
	// second row
	{id: 14, type: 'textKey', text: 'tab', className: 'key-tab key-special-l'},
	{id: 15, type: 'defaultKey', char: 'Q'},
	{id: 16, type: 'defaultKey', char: 'W'},
	{id: 17, type: 'defaultKey', char: 'E'},
	{id: 18, type: 'defaultKey', char: 'R'},
	{id: 19, type: 'defaultKey', char: 'T'},
	{id: 20, type: 'defaultKey', char: 'Y'},
	{id: 21, type: 'defaultKey', char: 'U'},
	{id: 22, type: 'defaultKey', char: 'I'},
	{id: 23, type: 'defaultKey', char: 'O'},
	{id: 24, type: 'defaultKey', char: 'P'},
	{id: 25, type: 'doubleKey', top: '/', bottom: 'ú'},
	{id: 26, type: 'doubleKey', top: '(', bottom: 'ä'},
	{id: 27, type: 'doubleKey', top: ')', bottom: 'ň'},
	// third row
	{id: 28, type: 'textKey', text: 'caps', className: 'key-caps key-special-l'},
	{id: 29, type: 'defaultKey', char: 'A'},
	{id: 30, type: 'defaultKey', char: 'S'},
	{id: 31, type: 'defaultKey', char: 'D'},
	{id: 32, type: 'defaultKey', char: 'F'},
	{id: 33, type: 'defaultKey', char: 'G'},
	{id: 34, type: 'defaultKey', char: 'H'},
	{id: 35, type: 'defaultKey', char: 'J'},
	{id: 36, type: 'defaultKey', char: 'K'},
	{id: 37, type: 'defaultKey', char: 'L'},
	{id: 39, type: 'doubleKey', top: '"', bottom: 'ô'},
	{id: 40, type: 'doubleKey', top: '!', bottom: '§'},
	{id: 41, type: 'textKey', text: 'enter', className: 'key-return key-special-r'},
	// fourth row
	{id: 42, type: 'textKey', text: 'shift', className: 'key-shift-l key-special-l'},
	{id: 43, type: 'defaultKey', char: 'Z'},
	{id: 44, type: 'defaultKey', char: 'X'},
	{id: 45, type: 'defaultKey', char: 'C'},
	{id: 46, type: 'defaultKey', char: 'V'},
	{id: 47, type: 'defaultKey', char: 'B'},
	{id: 48, type: 'defaultKey', char: 'N'},
	{id: 49, type: 'defaultKey', char: 'M'},
	{id: 50, type: 'doubleKey', top: '?', bottom: ','},
	{id: 51, type: 'doubleKey', top: ':', bottom: '.'},
	{id: 52, type: 'doubleKey', top: '_', bottom: '-'},
	{id: 53, type: 'textKey', text: 'shift', className: 'key-shift-r key-special-r'},
	// fifth row
	{id: 54, type: 'textKey', text: 'ctrl', className: 'key-narrow key-special-l'},
	{id: 55, type: 'textKey', text: 'win', className: 'key-narrow key-special-l'},
	{id: 56, type: 'textKey', text: 'alt', className: 'key-narrow key-special-l'},
	{id: 57, type: 'textKey', text: ' ', className: 'key key-space'},
	{id: 58, type: 'textKey', text: 'alt', className: 'key-narrow key-special-r'},
	{id: 59, type: 'textKey', text: 'fn', className: 'key-narrow key-special-r'},
	{id: 60, type: 'textKey', text: 'pn', className: 'key-narrow key-special-r'},
	{id: 61, type: 'textKey', text: 'ctrl', className: 'key-narrow key-special-r'}
]

KeySuggestion.defaultProps = {
	keyboardSettings: keyboardSettings,
	data: {
		correctKey: 'a',
		incorrectKey: 'b'
	}
}
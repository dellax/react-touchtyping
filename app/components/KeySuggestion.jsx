import React, { PropTypes } from 'react';

export default class KeySuggestion extends React.Component {
	constructor(props) {
		super(props);
		this.keys = props.keyboardSettings.keys;
		this.highlightedKeysIndexes = [];
		for (let key of this.keys) {
			key.status = '';
		}
		this.keyMap = this.createKeyMap(this.keys);
		this.highlightKeys();
	}

	componentWillReceiveProps(props) {
		this.unHighlightKeys();
		this.highlightKeys();
	}

	createKeyMap(keys) {
		let keyMap = new Map();
		let index = 0;
		for (let key of keys) {
			switch(key.type) {
				case 'doubleKey':
					keyMap.set(key.top, {index, finger: fingerByIndex.get(index)});
					keyMap.set(key.bottom, {index, finger: fingerByIndex.get(index)});
					break;
				case 'textKey':
					keyMap.set(key.text, {index, finger: fingerByIndex.get(index)});
					break;
				default:
					keyMap.set(key.char, {index, finger: fingerByIndex.get(index)});
			}
			index++;
		}
		return keyMap;
	}

	highlightKeys() {
		this.higlightCorrectKey();
		this.higlightIncorrectKey();
	}

	higlightCorrectKey() {
		// TODO
	}

	higlightIncorrectKey() {
		// TODO
		// isUpercaseLetter
		// 
		if (this.props.pressedKey === '') return;
		let c = this.props.pressedKey.toUpperCase();
		let index = this.keyMap.get(c).index;
		this.keys[index].status = 'incorrect-key';
		this.highlightedKeysIndexes.push(index);
	}

	unHighlightKeys() {
		for (let index of this.highlightedKeysIndexes) {
			this.keys[index].status = '';
		}
	}

	render() {
		const keys = this.keys;
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
	<div className={`key ${data.status}`}>{data.char}</div>
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
		<div className={`key ${data.status}`}>
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
		<div className={`key ${data.className} ${data.status}`}>
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

const fingerByIndex = new Map([
	// first row
	[0, 'l-1'], [1, 'l-1'], [2, 'l-2'], [3, 'l-3'], [4, 'l-4'], [5, 'l-4'],
	[6, 'r-2'], [7, 'r-2'], [8, 'r-3'], [9, 'r-4'], [10, 'r-5'],[11, 'r-5'],
	[12, 'r-5'], [13, 'r-5'],
	// second row
	[14, 'l-1'], [15, 'l-1'], [16, 'l-2'], [17, 'l-3'], [18, 'l-4'],
	[19, 'l-4'], [20, 'r-2'], [21, 'r-2'], [22, 'r-3'], [23, 'r-4'],
	[24, 'r-5'], [25, 'r-5'], [26, 'r-5'], [27, 'r-5'],
	// third row
	[28, 'l-1'], [29, 'l-1'], [30, 'l-2'], [31, 'l-3'], [32, 'l-4'],
	[33, 'l-4'], [34, 'r-2'], [35, 'r-2'], [36, 'r-3'], [37, 'r-4'],
	[38, 'r-5'], [39, 'r-5'], [40, 'r-5'],
	// fourth row
	[41, 'l-1'], [42, 'l-1'], [43, 'l-2'], [44, 'l-3'], [45, 'l-4'],
	[46, 'l-4'], [47, 'r-2'], [48, 'r-2'], [49, 'r-3'], [50, 'r-4'],
	[51, 'r-5'], [52, 'r-5'],
	// fifth row
	[53, 'l-1'], [54, 'l-1'], [55, 'l-1'], [56, 'r-1'], [57, 'r-1'],
	[58, 'r-5'], [59, 'r-5'], [60, 'r-5']
])

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
	{id: 38, type: 'doubleKey', top: '"', bottom: 'ô'},
	{id: 39, type: 'doubleKey', top: '!', bottom: '§'},
	{id: 40, type: 'textKey', text: 'enter', className: 'key-return key-special-r'},
	// fourth row
	{id: 41, type: 'textKey', text: 'shift', className: 'key-shift-l key-special-l'},
	{id: 42, type: 'defaultKey', char: 'Z'},
	{id: 43, type: 'defaultKey', char: 'X'},
	{id: 44, type: 'defaultKey', char: 'C'},
	{id: 45, type: 'defaultKey', char: 'V'},
	{id: 46, type: 'defaultKey', char: 'B'},
	{id: 47, type: 'defaultKey', char: 'N'},
	{id: 48, type: 'defaultKey', char: 'M'},
	{id: 49, type: 'doubleKey', top: '?', bottom: ','},
	{id: 50, type: 'doubleKey', top: ':', bottom: '.'},
	{id: 51, type: 'doubleKey', top: '_', bottom: '-'},
	{id: 52, type: 'textKey', text: 'shift', className: 'key-shift-r key-special-r'},
	// fifth row
	{id: 53, type: 'textKey', text: 'ctrl', className: 'key-narrow key-special-l'},
	{id: 54, type: 'textKey', text: 'win', className: 'key-narrow key-special-l'},
	{id: 55, type: 'textKey', text: 'alt', className: 'key-narrow key-special-l'},
	{id: 56, type: 'textKey', text: ' ', className: 'key key-space'},
	{id: 57, type: 'textKey', text: 'alt', className: 'key-narrow key-special-r'},
	{id: 58, type: 'textKey', text: 'fn', className: 'key-narrow key-special-r'},
	{id: 59, type: 'textKey', text: 'pn', className: 'key-narrow key-special-r'},
	{id: 60, type: 'textKey', text: 'ctrl', className: 'key-narrow key-special-r'}
]

KeySuggestion.defaultProps = {
	keyboardSettings: keyboardSettings,
	data: {
		correctKey: 'a',
		incorrectKey: 'b'
	}
}
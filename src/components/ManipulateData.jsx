import React from 'react';
import { FaStar } from 'react-icons/fa';
import ImageNotFound from '../assets/images/404.jpg';

// --------------
// - components |
// --------------

/**
 * react component use to generate stars depend on `props.star_length`
 * @param {Object} props number of stars
 * @returns {import('react').ReactElement} span of generated stars
 */
const Stars = (props) => {
	const { stars_length } = props;
	let temp = [];
	for (let index = 0; index < stars_length; index++) {
		temp.push(<FaStar key={index} />);
	}
	return <span className="text-warning">{temp}</span>;
};

Stars.defaultProps = {
	stars_length: 1,
};

// -------------
// - functions |
// -------------

function capitalize(str = '') {
	return str.trim().replace(/^\w/, (char) => char.toUpperCase());
}

/**
 * add zero to make two pair of number
 * @param {Number} num number to be formate
 * @returns {String}
 */
const add_zero = (num = 0) => {
	return num.toString().length > 1 ? num.toString() : `0${num}`;
};

/**
 * turn date to human readable date
 * @param {Date | String} date date object to formate
 * @returns {String}
 */
const human_date = (date) => {
	const temp = typeof date === 'string' ? new Date(date) : date;
	let year = temp.getFullYear(),
		month = add_zero(temp.getMonth() + 1),
		day = add_zero(temp.getDay() + 1);

	return `${year}-${month}-${day}`;
};

/**
 * create slug from strings like titles
 * @param {String} str the string to be slugify
 * @returns {String}
 */
function slugify(str) {
	return str ? str.trim().replace(/\W+/g, '-').toLowerCase() : '';
}

/**
 * calculate diff between dates in days
 * @param {Date | String} date_1 first date must be bigger than otherDate
 * @param {Date | String} date_2 second date
 * @returns {Number} days number
 */
function diff_in_days(date_1, date_2) {
	const first_date =
			typeof date_1 === 'string'
				? new Date(date_1).getTime()
				: date_1.getTime(),
		second_date =
			typeof date_2 === 'string'
				? new Date(date_2).getTime()
				: date_2.getTime();
	return Math.ceil(Math.abs(first_date - second_date) / (1000 * 60 * 60 * 24));
}

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

/**
 * copy string to clipboard
 * @param {String} text the string to be copy
 */
const copyToClipboard = (text) => {
	const temp_textarea = document.createElement('textarea');
	temp_textarea.value = text;
	document.body.appendChild(temp_textarea);
	temp_textarea.select();
	document.execCommand('copy');
	document.body.removeChild(temp_textarea);
};

/**
 * JavaScript array equality: A smarter way to compare two arrays
 * @param {Array} arr1 array 1
 * @param {Array} arr2 array 2
 * @returns {Boolean} is equal or not
 */
const isEqualArray = (arr1, arr2) => {
	return (
		arr1.length === arr2.length &&
		arr1.every((element) => arr2.includes(element))
	);
};

/**
 *  Get type of a variable in string

```js
getTypeOf('hello world'); // String
getTypeOf(1000); // Number
getTypeOf(Infinity); // Number
getTypeOf(true); // Boolean
getTypeOf(Symbol()); // Symbol
getTypeOf(null); // Null
getTypeOf(undefined); // Undefined
getTypeOf({}); // Object
getTypeOf([]); // Array
getTypeOf(/[a-z]/g); // RegExp
getTypeOf(new Date(2021)); // Date
getTypeOf(new Error()); // Error
getTypeOf(function () {}); // Function
getTypeOf((a, b) => a + b); // Function
getTypeOf(async () => {}); // AsyncFunction
getTypeOf(document); // HTMLDocument
```
 * @param {any} obj any variable
 * @returns {String} type
 */
const getTypeOf = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

/**
 * JavaScript Object equality: A smarter way to compare two Object
 * @param {Object} obj1 object 1
 * @param {Object} obj2 object 2
 * @returns {Boolean} is equal or not
 */
function isEqualObject(obj1, obj2) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * generate big integer by length
 * @param {Number} length length of generated number
 * @returns {BigInt}
 */
function randomBigInt(length = 16) {
	const hexString = Array(length)
		.fill()
		.map(() => Math.round(Math.random() * 0xf).toString(16))
		.join('');

	// eslint-disable-next-line no-undef
	return BigInt(`0x${hexString}`);
}

function onImageNotLoad(evt) {
	evt.target.src = ImageNotFound;
}

export {
	Stars,
	capitalize,
	human_date,
	slugify,
	diff_in_days,
	monthNames,
	copyToClipboard,
	isEqualArray,
	isEqualObject,
	getTypeOf,
	randomBigInt,
	onImageNotLoad,
};

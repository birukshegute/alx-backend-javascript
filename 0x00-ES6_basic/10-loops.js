export default function appendToEachArrayValue(array, appendString) {
	const array = [];
  	for (const value of array) {
    		array.push(appendString + value);
  	}
	return array;
}

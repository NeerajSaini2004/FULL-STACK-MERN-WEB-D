// +++++++++++++++++++++++++++++++++++++++++ SET +++++++++++++++++++++++++++++++++++++++
// Set object lets you store unique values of any type. It's like an array but with unique values and no repetion, it takes care of repetition and order of the values.

const newSet = new Set();
newSet.add(2);
newSet.add(3);
newSet.add(2);
newSet.add(1);

console.log(newSet);
//console.log(newSet.has(4)); //
console.log(newSet.delete(3)); // informs by boolean value if the passed value is deleted or not.
console.log(newSet);

const arr = [1, 2, 3, 4, 2, 3, 5];
const arrSet = new Set(arr);

console.log(arrSet.has(9));
console.log(arrSet.has(4));
arrSet.clear();
console.log(arrSet);


//set difference
const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);
const difference = new Set([...set1].filter(x => !set2.has(x)));

// +++++++++++++++++++++++++++++++++++++++ MAP ++++++++++++++++++++++++++++++++++++
//map is a collection of key-value pairs, where keys can be of any type and values can also be of any type. It remembers the original insertion order of the keys.
const myMap = new Map();
myMap.set("name1", "neeraj");
myMap.set("name2", "saini");
console.log(myMap);
const newArray = [
  ["1", "NEERAJ"],
  ["2", "SAINI"],
  ["3", "neha"],
  ["4", "Manisha"],
  ["4", "Manish"],
  ["5", "mohit"],
  ["6", "Sareef"],
  ["6", "yuvraj"], // it'll overwrite the value of key 6.
];
// now the goal is to make a map from the given 2d Array.
// first we'll have to loop through each element.

newArray.forEach((el) => myMap.set(el[0], el[1]));
console.log(myMap);
console.log(myMap.has("name2", "NEERAJ")); // true.
myMap.delete("1", "NEERAJ");
console.log(myMap);
// console.log(myMap.clear()); // clears the map
// console.log(myMap);
console.log(myMap.entries());
console.log(myMap.get("3"));
console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.size);
myMap.forEach((el, el2) => console.log(el, ":", el2)); // foreach(value, key)
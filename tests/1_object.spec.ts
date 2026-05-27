
let student1 = {
    name: "John",
    age: 20,
    city: "New York"
};

let student2 = {
    name1: "Jane",
    age1: 21,
    city1: "Los Angeles"
};

let merged = { ...student1, ...student2 };
console.log(merged);

//Object as Alias

type StudentTemplate = {name : string, age : number, city : string};

// let student3 : StudentTemplate = { name : "John", age : 20, city : "New York", phone : 1234567890}; // Error : phone is not a property of StudentTemplate



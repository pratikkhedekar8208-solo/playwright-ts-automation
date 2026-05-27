// ============================================
// TYPESCRIPT FUNCTIONS - COMPLETE GUIDE
// ============================================

console.log("\n=== 1. BASIC FUNCTIONS ===");

// Simple function with no parameters
function greet() {
    console.log("Hello, World!");
}
greet();

// Function with parameters (old string concatenation)
function greetWithName(name: string) {
    console.log("Hello " + name);
}
greetWithName("John");

// Function with parameters (modern template literals - RECOMMENDED)
function greetModern(name: string) {
    console.log(`Hello ${name}`);
}
greetModern("Leo");


console.log("\n=== 2. FUNCTIONS WITH RETURN VALUES ===");

// Function that returns a value
function add(a: number, b: number): number {
    return a + b;
}
const sum = add(5, 3);
console.log(`5 + 3 = ${sum}`);

// Function that returns a string
function getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
}
console.log(`Full name: ${getFullName("John", "Doe")}`);


console.log("\n=== 3. OPTIONAL PARAMETERS ===");

// Optional parameter (age?) - can be provided or skipped
function greetWithOptionalAge(name: string, age?: number) {
    if (age) {
        console.log(`Hello ${name}, you are ${age} years old`);
    } else {
        console.log(`Hello ${name}`);
    }
}
greetWithOptionalAge("Alice");           // Without age
greetWithOptionalAge("Bob", 25);         // With age


console.log("\n=== 4. DEFAULT PARAMETERS ===");

// Default parameter - has a fallback value if not provided
function greetWithDefaultAge(name: string, age: number = 18) {
    console.log(`Hello ${name}, you are ${age} years old`);
}
greetWithDefaultAge("Charlie");          // Uses default age: 18
greetWithDefaultAge("David", 30);        // Uses provided age: 30


console.log("\n=== 5. REST PARAMETERS ===");

// Rest parameters - accepts multiple values as an array
function calculateTotal(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(`Total of 1, 2, 3: ${calculateTotal(1, 2, 3)}`);
console.log(`Total of 10, 20, 30, 40: ${calculateTotal(10, 20, 30, 40)}`);


console.log("\n=== 6. ARROW FUNCTIONS ===");

// Arrow function - shorter syntax
const greetArrow = (name: string) => {
    console.log(`Hello ${name} (from arrow function)`);
}
greetArrow("Emma");

// Arrow function with return (explicit)
const multiply = (a: number, b: number): number => {
    return a * b;
}
console.log(`4 × 5 = ${multiply(4, 5)}`);

// Arrow function with implicit return (one-liner)
const square = (n: number): number => n * n;
console.log(`Square of 7 = ${square(7)}`);


console.log("\n=== 7. ARROW FUNCTIONS - ADVANCED ===");

// Arrow function with optional parameter
const describeUser = (name: string, role?: string) => {
    if (role) {
        console.log(`${name} is a ${role}`);
    } else {
        console.log(`${name} has no role assigned`);
    }
}
describeUser("Frank");
describeUser("Grace", "Developer");

// Arrow function with default parameter
const greetWithDefaultRole = (name: string, role: string = "Guest") => {
    console.log(`Welcome ${name}, Role: ${role}`);
}
greetWithDefaultRole("Henry");
greetWithDefaultRole("Ivy", "Admin");

// Arrow function with rest parameters
const findMax = (...numbers: number[]): number => {
    return Math.max(...numbers);
}
console.log(`Max of 5, 12, 8, 20, 3: ${findMax(5, 12, 8, 20, 3)}`);


console.log("\n=== 8. PRACTICAL EXAMPLES ===");

// Calculate discount
const calculateDiscount = (price: number, discount: number = 10): number => {
    return price - (price * discount / 100);
}
console.log(`Price after 10% discount: $${calculateDiscount(100)}`);
console.log(`Price after 25% discount: $${calculateDiscount(100, 25)}`);

// Validate email
const isValidEmail = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
}
console.log(`Is "test@example.com" valid? ${isValidEmail("test@example.com")}`);
console.log(`Is "invalid-email" valid? ${isValidEmail("invalid-email")}`);

console.log("\n=== END OF EXAMPLES ===\n");

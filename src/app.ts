//          Type Intersections
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin ()

type ElevatedEmployee = Admin & Employee;

const empl1: ElevatedEmployee = {
  name: "Andrea",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//          Type Guards

// function overloads - multiple function signatures, TS will determine the correct
// function to use, based on the arguments
function add(a: string, b: number): number;
function add(a: number, b: string): number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(empl1);
printEmployeeInformation({ name: "Andrea", startDate: new Date() });

// instanceof - works with classes
class Car {
  drive() {
    console.log("Driving...");
  }
}
class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const vehicle1 = new Car();
const vehicle2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(vehicle1);
useVehicle(vehicle2);

// discriminated Union - using the custom type property to determine the type
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// use switch statement to determine the type - this is a type guard
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// type casting
// first syntax
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
// second syntax
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement; // ! - tells TS that the element will never be null
userInputElement.value = "Hi there!";

// index property
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

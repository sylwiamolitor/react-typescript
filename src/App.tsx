import './App.css';

let name:string;
name = "My app";
let version:number;
let isComplete: boolean = false;
let versions: number[];

let role:[number, string];
role = [0, "admin"];

interface Person {
  name:string;
  age?:number;
}


interface animal {
  name: "Kitty";
  age: 25;
};

interface specialAnimal extends animal {
  food:string;
};



let people:Person[];
let unionExample: number | string;
let voidFunction: (name:string) => never;
let unknownVariable: unknown;

function printName(name: string){
  console.log(name);
}

printName("MyName");

function App() {
  return <div className="App">In progress :)</div>
}

export default App;

import './App.css';
import InputField from './components/InputField';
import {useState} from "react";
import {Todo} from "./model";
import TodoList from './components/TodoList';

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


interface Animal {
  name: "Kitty";
  age: 25;
};

interface SpecialAnimal extends Animal {
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

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e : React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if(todo)
    {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };

  console.log(todo);
  console.log(todos);


  return <div className="App">
  <span className="heading">List App</span>
  <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
  {todos.map((t) => (
    <li>{t.todo}</li>
  ))}
  <TodoList todos={todos} setTodos={setTodos}></TodoList>
  In progress :)</div>
}

export default App;

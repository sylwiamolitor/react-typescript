import './App.css';
import InputField from './components/InputField';
import {useState} from "react";
import {Todo} from "./model";
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

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

const App: React.FunctionComponent = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e : React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if(todo)
    {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => { 
    const {source, destination} = result;
    if(!destination) return;
    if(destination.droppableId===source.droppableId && destination.index===source.index) return;
    let add;
    let active = todos;
    let complete = CompletedTodos;
    if(source.droppableId==="TodosList"){
      add=active[source.index];
      active.splice(source.index, 1);
    }
    else{
      add=complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId==="TodosList"){
      active.splice(destination.index, 0, add);
    }
    else{
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading">List App</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos}/>
    </div>
  </DragDropContext>);
};

export default App;

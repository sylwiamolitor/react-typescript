import "./styles.css"
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props{
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completed: Todo[];
    setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList : React.FunctionComponent<Props> =  ({todos, setTodos, completed, setCompleted} : Props) =>{
    return <div className="container">
    <Droppable droppableId="TodosList" >
    {(provided) => (
    <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>        
        <span className="todos__heading">            Active tasks        </span>
        {todos.map((todo, index) => (
            <SingleTodo index={index} todo={todo} key={todo.id} todos={completed} setTodos={setCompleted}/>
        ))}
    </div>
    )}
    </Droppable>
    <Droppable droppableId="TodosRemoveList">
    {(provided) => (
        <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">            Completed tasks        </span>
            {todos.map((todo, index) => (
                <SingleTodo index={index} todo={todo} key={todo.id} todos={completed} setTodos={setCompleted}/>
            ))}
        </div>
    )}  
    </Droppable>
    </div>
};
export default TodoList;
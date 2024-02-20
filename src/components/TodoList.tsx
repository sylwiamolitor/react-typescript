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
    {(provided, snapshot) => (
    <div className={'todos ${snapshot.isDraggingOver? "dragactive" : ""}'} ref={provided.innerRef} {...provided.droppableProps}>        
        <span className="todos__heading">            Active tasks        </span>
        {todos.map((todo, index) => (
            <SingleTodo index={index} todo={todo} key={todo.id} todos={completed} setTodos={setCompleted}/>
        ))}
        {provided.placeholder}
    </div>
    )}
    </Droppable>
    <Droppable droppableId="TodosRemove">
    {(provided, snapshot) => (
        <div className={'todos remove ${snapshot.isDraggingOver? "dragcomplete" : ""}'}
         ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">            Completed tasks        </span>
            {completed.map((todo, index) => (
                <SingleTodo index={index} todo={todo} key={todo.id} todos={completed} setTodos={setCompleted}/>
            ))}
        {provided.placeholder}
        </div>
    )}  
    </Droppable>
    </div>
};
export default TodoList;
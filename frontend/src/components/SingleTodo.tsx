import React from 'react';
import "./styles.css"
import {Todo} from "../model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    todo:Todo;
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo : React.FunctionComponent<Props> =  ({index, todo, todos, setTodos} : Props) =>{

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.title || '');
    const inputRef = useRef<HTMLInputElement>(null);

const handleDone = async (id:number)=> {
    const updated = todos.map(t => t.id===id?{...t, isDone:!t.isDone} : t);
    setTodos(updated);
    try{
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: todo.title, isDone: !todo.isDone })
        });
        if (!res.ok) {
            throw new Error(`Failed to update: ${res.status}`);
        }
    } catch(err){ console.error(err); }
};

const handleDelete = async (id:number)=> {
    setTodos(todos.filter(t => t.id!==id));
    try{
        const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error(`Failed to delete: ${res.status}`);
        }
    } catch(err){ console.error(err); }
};
const handleEdit = async (e: React.FormEvent, id:number)=> {
    e.preventDefault();

    setTodos(todos.map((t) => (
        t.id===id?{...t,  title:editTodo} : t
    )));

    try{
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editTodo, isDone: todo.isDone })
        });
        if (!res.ok) {
            throw new Error(`Failed to update: ${res.status}`);
        }
    } catch(err){ console.error(err); }

    setEdit(false);

};


useEffect(() => {
    inputRef.current?.focus();
}, [edit]);


return <Draggable draggableId={String(todo.id)} index={index}>
    {
        (provided, snapshot) => ( <form 
            className={`todos__single ${snapshot.isDragging? "drag" : ""}` }
        onSubmit={e => handleEdit(e, todo.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        {
         edit ?(
             <input value={editTodo} onChange={e => setEditTodo(e.target.value)} className='todos__single--text' ref={inputRef}/> 
         ):  todo.isDone?(
             <s className="todos__single--text">{todo.title} </s>
         ):(
             <span className="todos__single--text">{todo.title} </span>
         )
     }
 
         <div>
             <span className="icon" onClick={() => { if (!edit && !todo.isDone){
                 setEdit(!edit);
             }}}> <AiFillEdit/></span>
             <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
             <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone/></span>
         </div>
     </form>)
    }
   
    </Draggable>
};
export default SingleTodo;
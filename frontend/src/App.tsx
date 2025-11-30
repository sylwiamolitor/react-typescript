import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FunctionComponent = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      const active = data.filter((t: Todo) => !t.isDone);
      const done = data.filter((t: Todo) => t.isDone);
      setTodos(active);
      setCompletedTodos(done);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!todo) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: todo, isDone: false, createdAt: new Date().toISOString() })
      });
      if (!res.ok) throw new Error('Failed to create todo');
      setTodo('');
      await fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    const active = Array.from(todos);
    const complete = Array.from(completedTodos);

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTodos(complete);

    if (add) {
      const id = add.id;
      const isDone = destination.droppableId !== 'TodosList';
      fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: add.title, isDone }),
      }).catch(console.error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">List App</span>
        <div></div>
        <span className="date">Today is {new Date().toLocaleDateString()}</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} CompletedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        <hr />
      </div>
    </DragDropContext>
  );
};

export default App;

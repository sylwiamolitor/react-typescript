import React, { useEffect, useState } from 'react';

export interface ITodoItem {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: string;
}

const TodosTable: React.FC = () => {
  const [items, setItems] = useState<ITodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data.map((d: any) => ({
        id: d.id,
        title: d.title,
        isDone: d.isDone,
        createdAt: d.createdAt
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleDone = async (item: ITodoItem) => {
    try {
      const updated = { title: item.title, isDone: !item.isDone };
      const res = await fetch(`/api/todos/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update');
      await fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Todos from Server</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <input type="checkbox" checked={item.isDone} onChange={() => toggleDone(item)} />
              </td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodosTable;

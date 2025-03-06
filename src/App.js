import React, { useState, useEffect } from "react";
import "./App.css";

const API_BASE_URL = "https://ckiphd2ot6.execute-api.us-west-2.amazonaws.com/dev/bz-test-feb-19";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API_BASE_URL}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks", err));
  };

  const addTask = () => {
    if (!newTitle.trim()) return;

    fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription })
    })
      .then((res) => res.json())
      .then(() => {
        setNewTitle("");
        setNewDescription("");
        fetchTasks();
      });
  };

  const deleteTask = (id) => {
    fetch(`${API_BASE_URL}?task_id=${id}`, { method: "DELETE" })
      .then(() => fetchTasks());
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_id}</td>
              <td>{task.title}</td>
              <td>{task.description || "N/A"}</td>
              <td>{task.status}</td>
              <td>{new Date(task.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteTask(task.task_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

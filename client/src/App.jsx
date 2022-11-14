import { useEffect, useState } from "react";

const endpoint = "http://localhost:3030";

function App() {
  const [tasks, setTasks] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    fetch(endpoint + "/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("error: ", err));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <h4>Your tasks</h4>

      <div className="tasks">
        {tasks.map((task) => (
          <div className="task">
            <div className="checkbox"></div>

            <div className="text">{task.text}</div>

            <div className="delete-task">X</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

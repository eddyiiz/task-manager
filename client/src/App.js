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

  const completeTask = async (id) => {
    const data = await fetch(endpoint + "/tasks/complete/" + id).then((res) =>
      res.json()
    );
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task._id === data._id) {
          task.complete = data.complete;
        }
        return task;
      })
    );
  };

  async function deleteTask(id) {
    const data = await fetch(endpoint + "/tasks/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <h4>Your tasks</h4>

      <div className="tasks">
        {tasks.map((task) => (
          <div
            className={"task " + (task.complete ? "is-complete" : "")}
            key={task._id}
            onClick={() => completeTask(task._id)}
          >
            <div className="checkbox"></div>

            <div className="text">{task.text}</div>

            <button
              className="delete-task"
              onClick={() => deleteTask(task._id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

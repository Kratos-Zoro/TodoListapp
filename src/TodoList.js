import { useEffect, useState } from "react";

export default function TodoList() {
    function getStoredTodos() {
        let data = localStorage.getItem("todos");
        let json = JSON.parse(data);
        if (json) {
            return json;
        }
        return [];
    }

    const [todos, setTodos] = useState(getStoredTodos());
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(event) {
        event.preventDefault();

        let Task = event.target.Task.value;
        if (!Task) {
            alert("Please provide a valid Task");
            return;
        }

        setTodos([...todos, { Task: Task, completed: false }]);

        event.target.reset();
    }

    function ChangeTask(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function DeleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div className="container my-5">
            <div className="mx-auto rounded border p-4" style={{ width: "600px", backgroundColor: "orange" }}>

                <h2 className="text-white text-center mb-4">My TodoList App</h2>

                <form className="d-flex" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="New Task" name="Task"></input>
                    <button className="btn btn-outline-light" type="submit">ADD</button>
                </form>

                {todos.map((todo, index) => {
                    return (
                        <div key={index} className="rounded mt-4 p-2 d-flex" style={{ backgroundColor: todo.completed ? "green" : "aquamarine" }}>
                            <div className="me-auto">
                                {todo.Task}
                            </div>
                            <div>
                                <i
                                    className={"h5 me-2 " + (todo.completed ? "bi bi-person-fill-check" : "bi bi-person-fill")}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => ChangeTask(index)}
                                ></i>
                                <i
                                    className="bi bi-trash text-black h5"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => DeleteTask(index)}
                                ></i>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

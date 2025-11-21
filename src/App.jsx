import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { FaCode } from "react-icons/fa";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let TodoString = localStorage.getItem("Todos");
    if (TodoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(Todos);
    }
  }, []);

  const SaveToLS = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSave = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    SaveToLS();
  };

  const handleEdit = (e) => {
    let id = e.currentTarget.name;
    let t = Todos.filter((items) => items.id === id);
    setTodo(t[0].Todo);

    let newTodo = Todos.filter((items) => items.id !== id);
    setTodos(newTodo);
    SaveToLS();
  };

  const handleDelete = (e, id) => {
    const ok = confirm("Are you sure you want to delete this task?");
    if (!ok) return;

    let newTodos = Todos.filter((items) => items.id !== id);
    setTodos(newTodos);
    SaveToLS();
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((items) => items.id === id);
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    SaveToLS();
  };

  return (
    <>
      <div className="bg-bgCard shadow-xl backdrop-blur-xl rounded-2xl p-6 mx-3 md:container md:mx-auto my-5 min-h-[80vh] w-full max-w-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-textGray">
          To Do List
        </h1>

        {/* Input + Save button (Fully Responsive) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="flex items-center bg-white shadow-md rounded-xl px-3 py-2 w-full border border-borderGray">
            <div className="text-textGray mr-2 text-xl">
              <FaCode />
            </div>
            <input
              onChange={handleChange}
              className="w-full outline-none border-none text-gray-700"
              type="text"
              placeholder="Enter your task"
              value={Todo}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={Todo.length <= 2}
            className="bg-accentPurple text-white text-lg font-semibold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition flex items-center gap-1 cursor-pointer w-full sm:w-auto justify-center"
          >
            <IoIosSave /> SAVE
          </button>
        </div>

        {/* Show finished */}
        <div>
          <input
            className="my-2"
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
          />{" "}
          Show Finished
        </div>

        <div className="my-1 font-bold text-lg">Your Todos</div>

        <div className="TODOS">
          {Todos.length === 0 && <div className="m-5">No Todos to Display</div>}

          {Todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todos_content flex flex-col sm:flex-row my-3 items-start sm:items-center gap-3 bg-white/10 p-3 rounded-xl"
                >
                  {/* checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={handleCheckBox}
                      checked={item.isCompleted}
                      name={item.id}
                      className="mr-3 text-lg hover:scale-105 transition"
                    />
                  </div>

                  {/* todo text */}
                  <div
                    className={`todo_text flex-1 text-textGray ${
                      item.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {item.Todo}
                  </div>

                  {/* Edit + Delete buttons */}
                  <div className="buttons flex gap-2 flex-wrap justify-end">
                    <button
                      onClick={handleEdit}
                      name={item.id}
                      className="other_btn_e bg-accentPurple text-white text-lg font-semibold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                    >
                      <FiEdit3 />
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="other_btn_d text-white text-lg font-semibold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

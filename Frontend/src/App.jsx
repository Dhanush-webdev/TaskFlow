import { useState } from "react";
import profilepic from "./assets/profilepic.svg";
import MyTasks from "./Components/My-tasks.jsx";

const App = () => {
    // -----------------------------
    // STATE
    // -----------------------------

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    const [allTasks, setAllTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    // -----------------------------
    // CREATE / UPDATE TASK
    // -----------------------------

    const handleSubmit = () => {
        if (editIndex !== null) {
            // UPDATE EXISTING TASK

            const updatedTasks = [...allTasks];

            updatedTasks[editIndex] = {
                title,
                description,
            };

            setAllTasks(updatedTasks);
            setEditIndex(null);
        } else {
            // CREATE NEW TASK

            const newTask = {
                title: title,
                description: description,
            };

            setAllTasks([...allTasks, newTask]);
        }

        // Clear input boxes
        setTitle("");
        setDescription("");
    };

    // -----------------------------
    // EDIT TASK
    // -----------------------------

    const editTask = (index) => {
        setTitle(allTasks[index].title);
        setDescription(allTasks[index].description);
        setEditIndex(index);
    };

    // -----------------------------
    // DELETE TASK
    // -----------------------------

    const deleteTask = (index) => {
        const newTask = [...allTasks];

        newTask.splice(index, 1);

        setAllTasks(newTask);

        // If the task being edited was deleted
        if (editIndex === index) {
            setEditIndex(null);
            setTitle("");
            setDescription("");
        }

            // If a task before the task being edited was deleted,
        // the edit index needs to move one position backward.
        else if (editIndex !== null && editIndex > index) {
            setEditIndex(editIndex - 1);
        }
    };

    // -----------------------------
    // SEARCH TASKS
    // -----------------------------

    const searchTasks = allTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    // -----------------------------
    // UI
    // -----------------------------

    return (
        <div className="flex bg-yellow-100 h-screen w-full">

            {/* =========================
          LEFT SIDE
          ========================= */}

            {/* LEFT SIDE */}

            <div className="w-2/7 h-full">

                <div className="mx-2 my-3 px-3 py-10 border-2 border-[#556B2F] h-[calc(100%-1.5rem)] rounded-lg flex flex-col">

                    {/* PROFILE */}

                    <div className="profile-section flex gap-5 items-center">

                        <img
                            src={profilepic}
                            alt="Profile pic"
                            className="rounded-full max-h-10 max-w-10"
                        />

                        <h1 className="font-medium">
                            Dhanush
                        </h1>

                    </div>


                    {/* SEARCH */}

                    <div className="flex gap-2 mt-5 items-center">

                        <h2>🔎</h2>

                        <input
                            className="border w-full px-2 py-1 rounded-xl"
                            placeholder="Search Tasks..."
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>


                    {/* TASK TITLE */}

                    <h2 className="mt-5 text-2xl">
                        My Tasks..
                    </h2>


                    {/* ONLY THIS PART SCROLLS */}

                    <div className="flex flex-col gap-2 mt-5 flex-1 min-h-0 overflow-y-auto">

                        {searchTasks.map((task, index) => (

                            <MyTasks
                                key={index}
                                index={index}
                                title={task.title}
                                description={task.description}
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />

                        ))}

                    </div>

                </div>

            </div>


            {/* =========================
          RIGHT SIDE
          ========================= */}

            <div className="max-h-full flex flex-col w-5/7">

                <div className="mx-2 my-3 p-3 flex flex-col items-center border-2 border-[#DAA520] h-full rounded-lg">

                    <h1 className="text-5xl">
                        Task Flow
                    </h1>


                    {/* TITLE INPUT */}

                    <input
                        type="text"
                        placeholder="Title..."
                        className="rounded-full w-full border px-8 py-3 my-5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    {/* DESCRIPTION INPUT */}

                    <textarea
                        placeholder="Description..."
                        className="rounded-xl w-full min-h-50 border px-8 py-3 my-5 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                    {/* CATEGORY + DEADLINE */}

                    <div className="flex justify-around items-center w-full">

                        <button className="m-5 px-10 py-3 border rounded-xl bg-blue-700 text-white">
                            Category
                        </button>

                        <button className="m-5 px-10 py-3 border rounded-xl bg-red-700 text-white">
                            Deadline
                        </button>

                    </div>


                    {/* CREATE / UPDATE BUTTON */}

                    <button
                        className="py-6 bg-green-500 text-white w-full border rounded-md"
                        onClick={handleSubmit}
                    >
                        {editIndex !== null
                            ? "UPDATE TASK"
                            : "CREATE TASK"}
                    </button>


                    {/* CANCEL EDIT BUTTON */}

                    {editIndex !== null && (

                        <button
                            className="mt-2 py-2 bg-gray-500 text-white w-full border rounded-md"
                            onClick={() => {
                                setEditIndex(null);
                                setTitle("");
                                setDescription("");
                            }}
                        >
                            CANCEL EDIT
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
};

export default App;
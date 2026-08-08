// App.jsx
import { useState } from "react";
import profilepic from "./assets/profilepic.svg";
import MyTasks from "./Components/My-tasks.jsx";

const App = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [allTasks, setAllTasks] = useState([]);

    const submiter = () => {
        const newTask = {
            title: title,
            description: description,
        };

        setAllTasks([...allTasks, newTask]);

        setTitle("");
        setDescription("");
    };

    return (
        <div className="flex h-screen w-full">
            {/* LEFT SIDE */}
            <div className="max-h-full flex flex-col w-2/7">
                <div className="mx-2 my-3 px-3 py-10 border-2 border-[#556B2F] h-full rounded-lg">

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

                    <div className="tasks">
                        <h2 className="mt-10 text-2xl">
                            My Tasks..
                        </h2>

                        {allTasks.map((task, index) => (
                            <MyTasks
                                key={index}
                                title={task.title}
                                description={task.description}
                            />
                        ))}

                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="max-h-full flex flex-col w-5/7">
                <div className="mx-2 my-3 p-3 flex flex-col items-center border-2 border-[#DAA520] h-full rounded-lg">

                    <h1 className="text-5xl">
                        Task Flow
                    </h1>

                    <input
                        type="text"
                        placeholder="Title..."
                        className="rounded-full w-full border px-8 py-3 my-5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Description..."
                        className="rounded-xl w-full min-h-50 border px-8 py-3 my-5 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex justify-around items-center w-full">
                        <button className="m-5 px-10 py-3 border rounded-xl bg-blue-700 text-white">
                            Category
                        </button>

                        <button className="m-5 px-10 py-3 border rounded-xl bg-red-700 text-white">
                            Deadline
                        </button>
                    </div>

                    <button
                        className="py-6 bg-green-500 text-white w-full border rounded-md"
                        onClick={submiter}
                    >
                        CREATE TASK
                    </button>

                </div>
            </div>
        </div>
    );
};

export default App;
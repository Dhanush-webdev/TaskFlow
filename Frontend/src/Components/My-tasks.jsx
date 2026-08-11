import {useState} from "react";

const MyTasks = ({
                     title,
                     description,
                     onDelete,

                     todo_id,

                 }) => {

    const [completed, setCompleted] = useState(false);

    return (
        <div
            className={`${
                completed
                    ? "border-green-700"
                    : "border-red-700"
            } border-2 flex  p-2 my-2 justify-between w-full rounded-xl`}
        >

            <div className="flex flex-col ">
                <h3
                    onClick={() => {
                        setCompleted(!completed);
                    }}
                    className={`${completed ? "line-through" : ""} font-bold cursor-pointer rounded-lg  `}
                >
                    {title}
                </h3>

                <p className="text-sm text-gray-600 ml-2">
                    {description}
                </p>
            </div>

            <div className="flex  gap-3">
                <button
                    className="rounded-xl px-3 py-2 my-0 bg-red-700 text-white"
                    onClick={() => onDelete(todo_id)}
                >
                    Delete
                </button>


            </div>

        </div>
    );
};

export default MyTasks;
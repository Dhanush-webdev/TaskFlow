import {useState} from "react";

const EditTodo = ({
                      todo_id,
                      title,
                      description,
                      onUpdated,
                  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);

    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        // Load the latest task values whenever modal opens
        setEditTitle(title);
        setEditDescription(description);
        setIsOpen(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:5000/updatetodo/${todo_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        description: editDescription,
                    }),

                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTodo = await response.json();

            console.log("Updated:", updatedTodo);

            // Tell MyTasks/App that the task was updated
            onUpdated(updatedTodo);

            setIsOpen(false);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* EDIT BUTTON */}
            <button
                type="button"
                className="rounded-xl px-3 py-2 bg-blue-700 text-white"
                onClick={handleOpen}
            >
                Edit
            </button>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="relative w-full max-w-md p-6 bg-white rounded-xl">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-bold">
                                Edit Task
                            </h3>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit}>

                            {/* TITLE */}
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    className="border w-full rounded-xl px-3 py-2"
                                    required
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">
                                    Description
                                </label>

                                <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(e.target.value)
                                    }
                                    className="border w-full rounded-xl px-3 py-2 resize-none"
                                    rows="5"
                                    required
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-700 text-white py-2 rounded-xl"
                                >
                                    {loading ? "Updating..." : "Update Task"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTodo;
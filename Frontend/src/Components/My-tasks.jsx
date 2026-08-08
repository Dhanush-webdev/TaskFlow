// Components/My-tasks.jsx
import {useState} from 'react'


const MyTasks = ({ title, description, onDelete,index }) => {
    const [completed, setCompleted] = useState(false)
    return (
        <div className="flex justify-between items-center">
            <div className={`${completed ? "border-green-700 ":"border-red-700"} w-4/6 p-2 my-2 border cursor-pointer rounded-xl`}>
                <h3 onClick={()=> {
                    setCompleted(!completed)
                    console.log(completed)
                }} className={completed ? "line-through":""}>{title}</h3>
                {/*<p className="text-xs pl-2">{description}</p>*/}
            </div>
            <button className="rounded-xl px-3 py-2 my-0 bg-red-700 text-white" onClick={()=>onDelete(index)}>Delete</button>
        </div>
    );
};

export default MyTasks;
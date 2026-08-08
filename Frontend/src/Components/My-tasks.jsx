import React from 'react'

const MyTasks = ({title}) => {
    return (
        <div className=" my-2 border-gray-700 border rounded-md p-2 items-center flex justify-between  pl-3 ">
            <h2>{title}</h2>
            <button className="bg-blue-600 text-white px-3 py-1  rounded-xl">edit</button>
            {/*<h4 className="text-xs p-2">description...</h4>*/}
        </div>
    )
}
export default MyTasks

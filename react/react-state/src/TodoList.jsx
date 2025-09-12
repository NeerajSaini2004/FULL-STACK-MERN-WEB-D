import { set } from "mongoose";
import { useState } from "react";






export default function TodoList(){

   let [todos ,setTodos]=useState(["sample task"]);
   let [newTodo,setNewTodo]=useState("");

let addNewTask=()=>{
   setTodos([...todos,newTodo]);
   setNewTodo("");
}
   let updateTodoValue=(event)=>{
      console.log(event.target.Value);
   };


    return (
 <div>
 <input placeholder="add a task "value={newTodo} onChange={updateTodoValue} ></input>
 <button onClick={addNewTask}>add task</button>
 <br></br>
 <br />
 <br />

    <h1> TodoList</h1>
    <li>
        
          { TodoList.map((todo)=>(

           <li>{todo }</li>
          ))}
        
    </li>
 </div>
    );
}
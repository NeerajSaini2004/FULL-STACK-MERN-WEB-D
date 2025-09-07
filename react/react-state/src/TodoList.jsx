import { useState } from "react";






export default function TodoList(){

    return (
 <div>
 <input placeholder="add a task " />
 <button>add task</button>
 <br></br>
 <br />
 <br />

    <h1> TodoList</h1>
    <li>
        
          { TodoList.map((todo)=>(

           <li></li>
          ))}
        
    </li>
 </div>
    );
}
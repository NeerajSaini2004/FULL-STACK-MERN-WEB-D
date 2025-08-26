import React, { useState } from 'react';

function Counter() {
  // const [x, setX] = useState(0);

  const [todos , setTodos] = useState(['todo 1', 'todo 2']);

  return (
    <>
      {/* count: {x}is {(x%2==0) ? 'even' : 'odd'}
      <br />
      <button onClick={() => setX(x + 1)}>Inc</button>
      <button onClick={() => setX(x - 1)}>Dec</button> */}

      <ul>
        {todos.map((todo) => <li>{todos}</li>)}

        <button onClick={() => setTodos([...todos,'another one'])}>click</button>
      </ul>
    </>
  );
}

export default Counter;

import { useState } from 'react';
import './App.css';

// Child Component
// value as state
function Square() {
  const [value, setvalue] = useState(null);

  function handleClick() {
    setvalue('X');
  }

  return <button className="square" onClick={handleClick}>{value}</button>
}

// Parent Component
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}
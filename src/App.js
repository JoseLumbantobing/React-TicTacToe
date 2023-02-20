/*  PROSES PROJECT

> Untuk mengetahui pemenang dalam permainan tic-tac-toe, Board perlu mengetahui state dari masing-masing komponen di 9 square.

> Cara terbaik adalah dengan menyimpan state permainan di Board alih-alih di setiap squarenya. Komponen Board dapat memberi tahu setiap Square apa yang harus ditampilkan dengan meneruskan prop. Karena itu useState pada Square dipindahkan saja ke Board.

> Board Comp harus mengirimkan value props ke setiap Square comp nya.

> Karena useState di Square sudah tidak digunakan maka fungsi handleClick juga sudah bisa dihapus beserta onclick() di elemen button.

> Selanjutnya langkah saat Square di klik. Board comp sekarang yg mengolola apa yg harus diisi di squares. Karena state itu bersifat private hanya kepada component yg membuatnya, maka kita tidak dapat mengupdate state Board melalui Square comp.

> Solusinya adalah kita bisa mengirimkan function dari Board ke Square comp. Square akan memanggil fungsi tsb saat square diklik, jadi tambahkan juga fungsi tsb ke props Square comp. (mis, nama function nya adalah onSquareClick)

> 

*/

import { useState } from 'react';
import './App.css';

// Child Component
// value as state
function Square({value, onSquareClick}) {
  // const [value, setvalue] = useState(null);

  // function handleClick() {
  //   setvalue('X');
  // }

  return <button className="square" onClick={onSquareClick}>{value}</button>
}

// Parent Component
export default function Board() {
  // Array(9).fill(null) membuat array dengan sembilan elemen dan men-set masing-masing ke null. useState() untuk mendeklarasikan variabel state squares yg di set kedalam arrray. Setiap entry dalam array akan menjadi nilai dari setiap square
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  )
}
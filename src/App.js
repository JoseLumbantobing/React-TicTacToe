/*  PROSES PROJECT

> Untuk mengetahui pemenang dalam permainan tic-tac-toe, Board perlu mengetahui state dari masing-masing komponen di 9 square.

> Cara terbaik adalah dengan menyimpan state permainan di Board alih-alih di setiap squarenya. Komponen Board dapat memberi tahu setiap Square apa yang harus ditampilkan dengan meneruskan prop. Karena itu useState pada Square dipindahkan saja ke Board.

> Board Comp harus mengirimkan value props ke setiap Square comp nya.

> Karena useState di Square sudah tidak digunakan maka fungsi handleClick juga sudah bisa dihapus beserta onclick() di elemen button.

> Selanjutnya langkah saat Square di klik. Board comp sekarang yg mengolola apa yg harus diisi di squares. Karena state itu bersifat private hanya kepada component yg membuatnya, maka kita tidak dapat mengupdate state Board melalui Square comp.

> Solusinya adalah kita bisa mengirimkan function dari Board ke Square comp. Square akan memanggil fungsi tsb saat square diklik, jadi tambahkan juga fungsi tsb ke props Square comp. (mis, nama function nya adalah onSquareClick)

> Gerakan pertama di set sebagai X secara manual, sekarang mari tambahkan O.

> Buat state baru untuk pergantian simbol (mis, namanya xIsNext dan setXIsNext) dan useState nya boolean bernilai true.

> Di fungsi handleClick buat kondisi jika array squares[i] sudah ada maka tidak bisa diisi lagi. Kemudian edit code squares[i] = 'X' menjadi sebuah kondisi lagi dimana jika xIsNext bernilai true maka i = X dan jika false maka i = O. Setelah itu update nilai nextSquare dan ubah nilai xIsNext menjadi negasinya dengan method setXIsNext(!xIsNext).

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(lines[i]);
    console.log(a, b, c);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// Parent Component
export default function Board() {
  // Array(9).fill(null) membuat array dengan sembilan elemen dan men-set masing-masing ke null. useState() untuk mendeklarasikan variabel state squares yg di set kedalam arrray. Setiap entry dalam array akan menjadi nilai dari setiap square
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Buat state baru untuk membuat pergantian simbol
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Buat kondisi jika squares sudah berisi maka tidak bisa di isi lagi
    if(squares[i] || calculateWinner(squares)) {
      return;
    }

    // slice() -> membuat sebuah copy dari array squares dan me-return elemen yang dipilih dalam array sebagai array baru.
    const nextSquares = squares.slice();
    // xIsNext bernilai true maka i = X
    if(xIsNext){
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    // xIsNext diubah menjadi false maka i selanjutnya = O
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = `Winner: ${winner}`;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        {/* Saat square diklik, code setelah => “panah” akan dijalankan, memanggil handleClick(0). */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}
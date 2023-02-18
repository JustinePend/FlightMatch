import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" 
    onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      squares: Array(9).fill(null),
      xIsNext: true,
      turns: 0,
      selected: null,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    let selected = this.state.selected;
    let xIsNext = this.state.xIsNext;
    if(this.state.turns >= 3 && selected != null  && squares[i]) {
      if(squares[i] == (xIsNext ? 'X' : 'O')) {
        selected = null;
      } else {
        return;
      }
    } else if(calculateWinner(squares) || (this.state.turns < 3 && squares[i]) 
      || ((this.state.turns >= 3 ) && (!selectSquareIsGood(i, this)))) {
      return;
    }

    //Checking if center is occupied
    if(squares[4] == (xIsNext ? 'X' : 'O')) {
      if(selected != 4 && selected != null) {
        let tempSquares = squares;
        tempSquares[selected] = null;
        tempSquares[i] = xIsNext ? 'X' : 'O';
        if(!calculateWinner(tempSquares)) {
          return;
        }
      }
    }
    if(selected != null) {
      squares[selected] = null;
      squares[i] = xIsNext ? 'X' : 'O';
      selected = null;
    } else {
      if(this.state.turns < 3) {
        squares[i] = xIsNext ? 'X' : 'O';
      } else {
        selected = i
        xIsNext = !xIsNext
      }
    }
    
   
    this.setState({
      squares: squares,
      xIsNext: !xIsNext,
      turns: this.state.xIsNext ? this.state.turns : ++this.state.turns,
      selected: selected,
    });
  }


  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function selectSquareIsGood(i, board) {
  if(board.state.selected) {
    return isAdjacent(i, board.state.selected);
  } else {
    return (board.state.squares[i] == (board.state.xIsNext ? 'X' : 'O')) && board.state.squares[i] != null;
  }
}

function isAdjacent(i, j) {
  let adj = [];
  if(i % 3 == 0) {
    adj = [i + 1, i + 3, i - 3, i + 4, i - 2];
  } else if(i %3 == 1) {
    adj = [i + 1, i - 1, i + 3, i - 3, i + 4, i + 2, i - 2, i - 4];
  } else {
    adj = [i - 1, i + 3, i - 3, i + 2, i - 4];
  }
  for(let c = 0; c < adj.length; c++) {
    if(j == adj[c]) {
      return true;
    }
  }
  return false;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);




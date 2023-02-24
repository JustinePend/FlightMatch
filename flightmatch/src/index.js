import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const element = <h1 className="greeting"> Hello, world!</h1>;
const element2 = React.createElement(
  'h1',
  {className: 'greeting2'},
  'Test test'
);

/**
 * 
 */

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() { //lifecycle methods
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return(
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
} 

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    //This binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return(
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}



/**
 * 
 * 
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      text: props.name
    }
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.state.text}</h1>
        <Clock /> 
        <Toggle />
      </div>
    
    );
  }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App name="Justine"/>);




import React, { useState } from "react";
import ReactDOM from "react-dom";

import useCreateClass from "./use-create-class";

function CountButton({ initialCount = 1 }) {
  const { render } = useCreateClass({
    getInitialState() {
      return {
        count: initialCount
      };
    },

    componentDidMount() {
      alert("component mounted yay!");
    },

    componentWillUnmount() {
      alert("component will unmount :(");
    },

    increaseCount() {
      this.setState({ count: this.state.count + 1 });
    },

    render() {
      return (
        <button onClick={this.increaseCount}>count: {this.state.count}</button>
      );
    }
  });

  return render();
}

function App() {
  const [showCountButton, setShowCountButton] = useState(true);

  return (
    <div>
      <p>hello</p>
      <button onClick={() => setShowCountButton(!showCountButton)}>
        toggle count button below
      </button>
      <br />
      {showCountButton && <CountButton initialCount={2} />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

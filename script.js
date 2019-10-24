import React from "react";
import ReactDOM from "react-dom";

import useCreateClass from "./use-create-class";

function App() {
  const { render } = useCreateClass({
    getInitialState() {
      return {
        count: 1
      };
    },

    componentDidMount() {
      console.log("component mounted yay!");
    },

    componentWillUnmount() {
      console.log("component will unmount :(");
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

  return (
    <div>
      <p>hello</p>
      {render()}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

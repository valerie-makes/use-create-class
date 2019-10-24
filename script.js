import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function useCreateClass(classObject) {
  Object.keys(classObject).forEach(key => {
    classObject[key] = classObject[key].bind(classObject);
  });

  const [state, setState] = useState(classObject.getInitialState());

  classObject.state = state;
  classObject.setState = newState => {
    setState(oldState => ({ ...oldState, ...newState }));
  };

  useEffect(() => {
    if (typeof classObject.componentDidMount === "function") {
      classObject.componentDidMount.call(classObject);
    }

    return () => {
      if (typeof classObject.componentWillUnmount === "function") {
        classObject.componentWillUnmount.call(classObject);
      }
    };
  }, []);

  return classObject;
}

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

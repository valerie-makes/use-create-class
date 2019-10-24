import { useState, useEffect } from "react";

export default function useCreateClass(classObject) {
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
      classObject.componentDidMount();
    }

    return () => {
      if (typeof classObject.componentWillUnmount === "function") {
        classObject.componentWillUnmount();
      }
    };
  }, []);

  return classObject;
}

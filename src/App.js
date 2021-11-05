import React, { useState, useRef, useLayoutEffect } from "react";
import logo from './logo.svg';
import './App.css';
import studio from "@theatre/studio"
import PropTypes from 'prop-types';

if (process.env.NODE_ENV === 'development') {
  studio.initialize()
}

const boxObjectConfig = {
  x: 0,
  y: 0,
}

const Box = ({id, sheet}) => {
  const obj = sheet.object(id, boxObjectConfig)
  const [pos, setPos] = useState({x: 0, y: 0})
  const refKey = useRef(null);

  useLayoutEffect(() => {
    const unsubscribeFromChanges = obj.onValuesChange((newValues) => {
      setPos(newValues)
    })
    return unsubscribeFromChanges
  }, [id, obj])

  return (
    <div
      onClick={() => {
        console.log(obj.value.x + 'x' + obj.value.y)
        console.log(pos.x + 'x' + pos.y)
      }}
      style={{
        position: "absolute",
        top: pos.y + 'px',
        left: pos.x + 'px',
      }}
      ref={refKey}
    >
      <img
        src={logo}
        className="App-logo"
        alt="logo"
      />
    </div>
  )
}

Box.propTypes = {
  id: PropTypes.string.isRequired,
  sheet: PropTypes.object.isRequired,
}

const App = ({project = project}) =>{
  const sheet = project.sheet('Scene', 'default')
  const id = '0'

  return (
    <div className="App">
      <header className="App-header">
      <Box
        key={'box' + id}
        id={id}
        sheet={sheet}
      />
      </header>
    </div>
  );
}

App.propTypes = {
  project: PropTypes.object.isRequired,
}

export default App;

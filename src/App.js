import * as React from 'react';
import BoxContainer from './Components/BoxContainer';
import { v4 as uuid } from 'uuid';

function App() {
  const [boxes, setBoxes] = React.useState([]);
  const [numBoxes, setNumBoxes] = React.useState(0);
  const [indices, setIndices] = React.useState([0]);
  const [targetIndex, setTargetIndex] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const [mode, setMode] = React.useState("boolean");
  const [high, setHigh] = React.useState(0);
  const [low, setLow] = React.useState(0);
  const [level, setLevel] = React.useState(0);

  const removing = new Event("removing");
  const nums = [3, 10, 30];
  const pts = [3, 10, 8];
  const MAXLEVEL = 3;

  const boxContainerStyle = {
    position: "relative",
    top: "100px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "200px"
  }

  const buttonStyle = {
    position: "absolute",
    bottom: "10px",
    right: ".125",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const scoreBoardStyle = {
    position: "relative",
    top: "10px",
    right: "10px",
    display: "flex",
    justifyContent: "right",
    alignItems: "right"
  }

  function addBox(e){
    setBoxes(prevBoxes => {
      const newBox = {id: numBoxes, name: numBoxes, targetId: targetIndex, mode: mode, color: "linear-gradient(-45deg, #000000, #c2bfbc)"};
      return [...prevBoxes, newBox]
    })
    setNumBoxes(prevNum => {
      return prevNum + 1;
    })
    setIndices(prevIndices => {
      return [...prevIndices, numBoxes]
    })
    setPoints(prevPoints => {
      return prevPoints + 1;
    })
  }

  /*function addBoxes(e){
    for (let i = 0; i < parseInt(document.getElementById("text").value); i++){
      setBoxes(prevBoxes => {
        const newBox = {id: numBoxes, name: numBoxes, targetId: targetIndex, mode: mode, color: "linear-gradient(-45deg, #000000, #c2bfbc)"};
        return [...prevBoxes, newBox]
      })
      setNumBoxes(prevNum => {
        return prevNum + 1
      })
      setIndices(prevIndices => {
        return [...prevIndices, numBoxes]
      })
    }
    let tIndex = Math.floor(Math.random() * numBoxes);
    const newState = () => boxes.map(box => {
      return {id: box.id, name: box.id, color: box.color, targetId: tIndex};
    })
    setBoxes(newState);
  }*/

  function removeBox(id){
    setBoxes(currBoxes => {
      currBoxes.filter(box => {
        return box.id !== id
      })
    })
  }

  function highlightBox(e){
    let number = indices[0]
    const newState = () => boxes.map(box => {
      if (box.name === number){
        return {id: box.id, name: box.name, targetId: targetIndex, mode: mode, color: "orange"};
      } else {
        return box;
      }
    })
    setBoxes(newState);
    setIndices(prevIndices => {
      return [prevIndices[0] + 1, ...prevIndices]
    })
  }

  function removeIndexAbove(e){
    //setIndex();
    //document.dispatchEvent(removing);
    let index = parseInt(document.getElementById("text").value);
    const newState = () => boxes.filter(box => box.id <= index);
    setBoxes(newState);
  }

  function removeIndexBelow(e){
    //setIndex();
    //document.dispatchEvent(removing);
    let index = parseInt(document.getElementById("text").value);
    const newState = () => boxes.filter(box => box.id >= index);
    setBoxes(newState);
  }

  function setIndex(e){
    let tIndex = parseInt(document.getElementById("text").value);
    //setTargetIndex(parseInt(document.getElementById("text").value));
    const newState = () => boxes.map(box => {
      return {id: box.id, name: box.name, color: box.color, targetId: tIndex, mode: mode};
    })
    setBoxes(newState);
  }

  function randomizeIndex(e){
    let tIndex = Math.floor(Math.random() * numBoxes);
    const newState = () => boxes.map(box => {
      return {id: box.id, name: box.id, color: box.color, targetId: tIndex, mode: mode};
    })
    setBoxes(newState);
  }

  function minusScore(e){
    if (mode == "arrow"){
      setPoints(points - 2);
    } else{
      setPoints(points - 1);
    }
  }

  function arrowMode(e){
    let mod = "arrow";
    const newState = () => boxes.map(box => {
      return {id: box.id, name: mode, color: box.color, targetId: box.targetId, mode: mod};
    })
    setBoxes(newState);
  }

  function reset(e){
    setBoxes([]);
    setNumBoxes(0);
    setIndices([0]);
    setTargetIndex(0);
  }

  function setStates(){
    let num = nums[level];
    let pt = pts[level];
    setNumBoxes(num);
    setTargetIndex(Math.floor(Math.random() * numBoxes));
    let newIndices = [];
    let newBoxes = [];
    for (let i = 0; i < num; i++){
      let newBox = {id: i, name: i, targetId: targetIndex, mode: mode, color: "linear-gradient(-45deg, #000000, #c2bfbc)"};
      newBoxes.push(newBox);
      newIndices.push(i);
    }
    setBoxes(newBoxes);
    setPoints(pt);
  }

  function previousLevel(e){
    if (level > 0){
      setLevel(level - 1);
      setStates();
    }
  }

  function nextLevel(e){
    if (level < MAXLEVEL){
      setLevel(level + 1);
      setStates();
    }
  }

  return (
    <>
      <div style={scoreBoardStyle}>
        Points: {points}
        Mode: {mode}
        Level: {level}
        <button id="previousLevel" onClick={previousLevel}>Previous Level</button>
        <button id="nextLevel" onClick={nextLevel}>Next Level</button>
      </div>
      <div style={boxContainerStyle} onClick={minusScore}>
        <BoxContainer boxes={boxes}/>
      </div>
      <div style = {buttonStyle}>
        <button id="addBox" onClick={addBox}>Add Element</button>
        <button id="addBoxes" onClick={setStates}>Generate New Elements</button>
        <button id="removal" onClick={removeIndexAbove}>Remove Elements Above</button>
        <button id="removal2" onClick={removeIndexBelow}>Remove Elements Below</button>
        <button id="setIndex" onClick={setIndex}>Set Target Index</button>
        <button id="randomizeIndex" onClick={randomizeIndex}>Randomize Target Index</button>
        <button id="arrowMode" onClick={arrowMode}>Toggle Arrow Mode</button>
        <button id="reset" onClick={reset}>Reset</button>
        <input type="text" id="text"></input>
      </div>
      <div style = {buttonStyle}>
      </div>
    </>
  );
}
export default App;

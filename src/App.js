import * as React from 'react';
import BoxContainer from './Components/BoxContainer';
import { v4 as uuid } from 'uuid';

function App() {
  const [boxes, setBoxes] = React.useState([]);
  const [numBoxes, setNumBoxes] = React.useState(0);
  const [indices, setIndices] = React.useState([0]);
  const [targetNumber, setTargetNumber] = React.useState(0);

  const boxContainerStyle = {
    position: "relative",
    top: "100px",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  }

  const buttonStyle = {
    position: "relative",
    top: "150px",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  }

  function addBox(e){
    setBoxes(prevBoxes => {
      const newBox = {id: numBoxes, name: numBoxes, removeIndex: removeIndex, color: "orange"};
      return [...prevBoxes, newBox]
    })
    setNumBoxes(prevNum => {
      return prevNum + 1
    })
    setIndices(prevIndices => {
      return [...prevIndices, numBoxes]
    })
  }

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
        return {...box, color: "green"};
      } else {
        return box;
      }
    })
    setBoxes(newState);
    setIndices(prevIndices => {
      return [prevIndices[0] + 1, ...prevIndices]
    })
  }

  function removeIndex(e){
    let index = parseInt(document.getElementById("text").value)
    const newState = () => boxes.filter(box => box.id < index);
    setBoxes(newState);
  }

  function test(e){
    const newBox = {id: numBoxes, name: document.getElementById("text").value, color: "orange"};
    setBoxes(currBoxes => {
      return [...currBoxes, newBox]});
  }

  return (
    <>
      <div style={boxContainerStyle}>
        <BoxContainer boxes={boxes}/>
      </div>
      <div style = {buttonStyle}>
        <button onClick={addBox}>New Element</button>
        <button onClick={removeIndex}>Remove Elements</button>
        <input type="text" id="text"></input>
      </div>
    </>
  );
}
export default App;

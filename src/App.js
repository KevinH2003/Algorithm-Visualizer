import * as React from 'react';
import NodeContainer from './Components/NodeContainer';

function App() {
  const [nodes, setNodes] = React.useState([]);
  const [numNodes, setNumNodes] = React.useState(0);
  const [indices, setIndices] = React.useState([0, 1]);

  const nodeContainerStyle = {
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

  function addNode(e){
    setNodes(prevNodes => {
      return [...prevNodes, {id: 1, name: numNodes, color: "orange"}]
    })
    setNumNodes(prevNum => {
      return prevNum + 1
    })
  }

  function highlightNode(e){
    let number = indices[0]
    const newState = () => nodes.map(node => {
      if (node.name === number){
        return {...node, color: "green"};
      } else {
        return node;
      }
    })
    setNodes(newState);
    setIndices(prevIndices => {
      return [prevIndices[0] + 1, ...prevIndices]
    })
  }

  return (
    <>
      <div style={nodeContainerStyle}>
        <NodeContainer nodes={nodes}/>
      </div>
      <div style = {buttonStyle}>
        <button onClick={addNode}>Test</button>
        <button onClick={highlightNode}>Highlight</button>
      </div>
    </>
  );
}
export default App;

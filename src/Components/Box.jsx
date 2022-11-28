import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

export default function Box({box}) {
  const [isVisible, setVisible] = React.useState(true);
  const [boxColor, setColor] = React.useState(box.color);
  const [boxText, setBoxText] = React.useState(box.name);

  const mystyle = {
    color: "black",
    width: "60px",
    height: "40px",
    margin: "10px 10px",
    //backgroundColor: "linear-gradient(-45deg, #C0C0C0, #0dd13a)",
    background: boxColor,
    textAlign: "center",
    visibility: box.visibility,
    animation: "gradient 15s ease infinite"
  }

  const expand = {
    scale: 1.15,
    animate: {scale: 1},
    transition: { duration: 0.15 },
  }

  const squish = {
    scale: 0.8,
    animate: {scale: 1},
    transition: {duration: 0.15},
  }

  function removeIfAbove(){
    box.name = box.targetId;
    if (box.id > box.targetId){
      vanish();
    }
  }
  
  const clicked = new Event("clicked");

  function changeColor(){
    if (box.mode == "arrow"){
      if (box.id > box.targetId){
        setColor("blue");
        setBoxText("<-");
      } else if (box.id < box.targetId){
        setColor("orange");
        setBoxText("->");
      } else{
        setColor("green");
      }
    } else{
      if (box.id != box.targetId){
        setColor("red");
      } else {
        setColor("green");
      }
    }
    document.dispatchEvent(clicked);
  }

  function vanish(){
    setVisible(false)
  }

  document.addEventListener("removing", removeIfAbove.bind(Box));
  
  return (
    <>
      <AnimatePresence>
        {isVisible &&
          <motion.button
          style={mystyle}
          initial = {{
            opacity: 0, 
          }}
          animate = {{
            opacity: 1, 
            scale: [0.1, 1.2, 1]

          }}
          transition ={{
            scale: {duration: 0.5}
          }}
          exit = {{opacity: 0}}
          whileHover = {expand}
          whileTap = {squish}
          onClick = {changeColor}

          
          >
            {boxText}
          </motion.button>
        }
      </AnimatePresence>
    </>
  )
}

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

export default function Box({box, removeIndex}) {
  const [isVisible, setVisible] = React.useState(true);
  const [boxColor, setColor] = React.useState(box.color);

  const mystyle = {
    color: "black",
    width: "50px",
    height: "30px",
    margin: "10px 10px",
    backgroundColor: boxColor,
    textAlign: "center",
    visibility: box.visibility,
  }

  const expand = {
    scale: 1.15,
    transition: { duration: 0.15 },
  }

  const squish = {
    scale: 0.8,
    transition: {duration: 0.15},
  }

  function test(){
    setTimeout(removeIfAbove, 50)
  }

  function removeIfAbove(){
    if (box.id > box.targetId){
      vanish();
    }
  }
  

  function changeColor(){
    setColor("green")
  }

  function vanish(){
    setVisible(false)
  }

  document.addEventListener("removing", test.bind(Box));
  return (
    <>
      <AnimatePresence>
        {isVisible &&
          <motion.button
          style={mystyle}
          initial = {{opacity: 0}}
          animate = {{opacity: 1}}
          exit = {{opacity: 0}}
          whileHover = {expand}
          whileTap = {squish}
          onClick = {changeColor}
          >
            {box.name}
          </motion.button>
        }
      </AnimatePresence>
    </>
  )
}

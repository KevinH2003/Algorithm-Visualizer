import React from 'react'
import Box from './Box'

export default function BoxContainer({ boxes }) {
  return (
    boxes.map(box => {
      return <Box key={box.id} box={box}/>
    })
  )
}

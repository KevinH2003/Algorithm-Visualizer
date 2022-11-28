import React from 'react'
import Box from './Box'
import { v4 as uuid } from 'uuid';

export default function BoxContainer({ boxes }) {
  return (
    boxes.map(box => {
      return <Box key={uuid} box={box}/>
    })
  )
}

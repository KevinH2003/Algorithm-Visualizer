import React from 'react'
import Node from './Node'

export default function NodeContainer({ nodes }) {
  return (
    nodes.map(node => {
      return <Node key={node.id} node={node}/>
    })
  )
}

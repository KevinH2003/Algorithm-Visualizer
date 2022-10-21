import React from 'react'

export default function Node({node}) {
  const mystyle = {
    color: "black",
    width: "50px",
    height: "30px",
    margin: "10px 10px",
    "background-color": node.color,
    "text-align": "center"
  }

  return (
    <>
        <div style={mystyle}>
        {node.name}
        </div>
    </>
  )
}

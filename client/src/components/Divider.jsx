import React from 'react'

const Divider = ({
  color = 'bg-slate-200', // Default color
  height = 'p-[0.5px]',   // Default height
  marginY = 'my-2',       // Default vertical margin
}) => {
  return (
    <div
      className={`${color} ${height} ${marginY}`}
    ></div>
  )
}

export default Divider

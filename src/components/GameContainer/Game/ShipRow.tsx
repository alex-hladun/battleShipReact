import React, { useState, useEffect } from 'react';

export default function ShipRow({ship}: any) {

  // console.log(player);
  console.log(ship)

  const shipCells = Array(ship.length).fill('').map((cell: any) => {
    return (
      <div className="ship-blocks" id="playership1"></div>
    )
  })

  return (
    <>
    {shipCells}
    </>
  )

}


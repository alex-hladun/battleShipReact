import React from 'react';

export default function ShipRow({ship}: any) {
  const shipCells = Array(ship.length).fill('').map((cell: any, index) => {
    if (index < ship.hitCount) {
      return (
        <div className="ship-blocks cell-ship-strike"></div>
      )
    } else {
      return (
        <div className="ship-blocks"></div>
      )
    }
  })

  return (
    <>
    {shipCells}
    </>
  )

}

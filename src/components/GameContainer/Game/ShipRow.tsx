import React from 'react';

export default function ShipRow({ship}: any, index: number) {
  const shipCells = Array(ship.length).fill('').map((cell: any, index) => {
    if (index < ship.hitCount) {
      return (
        <div key={'ship-block-strike' + index} className="ship-blocks cell-ship-strike"></div>
      )
    } else {
      return (
        <div key={'ship-block-' + index} className="ship-blocks"></div>
      )
    }
  })

  return (
    <>
    {shipCells}
    </>
  )

}


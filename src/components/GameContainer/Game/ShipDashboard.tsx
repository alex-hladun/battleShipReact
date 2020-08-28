import React from 'react';
import ShipRow from './ShipRow';

export default function ShipDashboard({ player }: any) {
  const shipRows = player.shipList.map((ship: any) => {
    return (
    <div className="ship-row">
      <ShipRow ship={ship}/>
    </div>
    )
  })

  return (
    <div className="ship-dashboard">
     {shipRows}
    </div>
  )

}


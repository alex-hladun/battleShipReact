import React from 'react';
import ShipRow from './ShipRow';

export default function ShipDashboard({ player }: any) {
  const shipRows = player.shipList.map((ship: any, index: number) => {
    return (
    <div key={'ship-row-group'+index} className="ship-row">
      <ShipRow key={'ship-row-'+index} ship={ship}/>
    </div>
    )
  })

  return (
    <div className="ship-dashboard">
     {shipRows}
    </div>
  )

}


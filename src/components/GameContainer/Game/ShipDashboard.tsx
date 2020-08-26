import React, { useState, useEffect } from 'react';
import ShipRow from './ShipRow';

export default function ShipDashboard({ player }: any) {

  console.log(player);
  const shipRows = player.shipList.map((ship: any) => {
    console.log('ship ishipDashboard', ship)
    return (
    <div className="ship-row">
      <ShipRow ship={ship}/>
    </div>
    )
  })

  return (
    <div id="player-ship-dashboard" className="ship-dashboard">
     {shipRows}
    </div>
  )

}


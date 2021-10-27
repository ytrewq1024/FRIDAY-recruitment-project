import React, { FC } from 'react';
import { ListVehiclesProps } from '../../interfaces/props';

const ListVehicles: FC<ListVehiclesProps> = ({
  vehicles,
  setShowVehiclesList,
  selectedMake,
  selectedModel
}) => {

  const vehiclesOnlyUnique = vehicles?.filter((thing, index, self) =>
    index === self.findIndex((vehicle) => (
      vehicle.make === thing.make &&
      vehicle.model === thing.model &&
      vehicle.enginePowerPS === thing.enginePowerPS &&
      vehicle.enginePowerKW === thing.enginePowerKW &&
      vehicle.fuelType === thing.fuelType &&
      vehicle.bodyType === thing.bodyType &&
      vehicle.engineCapacity === thing.engineCapacity
    ))
  )

  return (
    <div id='listVehicles'>
      <p className='goBack' onClick={() => setShowVehiclesList(false)}>
        {'<<< Go back to filters'}
      </p>
      <p>All vehicles for {selectedMake} ({selectedModel})</p>
      <p className='smallText'>enginePowerPS | enginePowerKW | fuelType | bodyType | engineCapacity</p>
      {
        vehiclesOnlyUnique?.map((vehicle, index) => {
          const {
            enginePowerPS,
            enginePowerKW,
            fuelType,
            bodyType,
            engineCapacity
          } = vehicle
          return(
            <div key={index}>
              <input type='checkbox' />
              <span className='smallText'>
                {`${enginePowerPS} | ${enginePowerKW} | ${fuelType} | ${bodyType} | ${engineCapacity}`}
              </span>
            </div>
          )
        })
      }
    </div>
  )
}

export default ListVehicles;

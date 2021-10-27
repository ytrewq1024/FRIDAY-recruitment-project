import React, { FC } from 'react';
import { SelectCarProps } from '../interfaces/props';
import ListVehicles from './modals/ListVehicles';
import SelectField from './modals/SelectField';

const SelectVehicle: FC<SelectCarProps> = ({
  selectedMake,
  selectedModel,
  selectedEnginePowerPS,
  selectedEnginePowerKW,
  selectedFuelType,
  selectedBodyType,
  selectedEngineCapacity,
  allEnginePowerPSs,
  allEnginePowerKWs,
  allFuelTypes,
  allBodyTypes,
  allEngineCapacity,
  vehiclesStatus,
  allModels,
  modelsStatus,
  allMakes,
  makesStatus,
  setSelectedMake,
  setSelectedModel,
  setSelectedEnginePowerPS,
  setSelectedEnginePowerKW,
  setSelectedFuelType,
  setSelectedBodyType,
  setSelectedEngineCapacity,
  filteredAllVehicles,
  showVehiclesList,
  setShowVehiclesList
}) => {
  if (showVehiclesList) {
    return <ListVehicles
      vehicles={filteredAllVehicles}
      setShowVehiclesList={setShowVehiclesList}
      selectedMake={selectedMake}
      selectedModel={selectedModel}
    />
  }
  return (
    <div id='selectVehicleView'>
    {
      makesStatus === 'success' && allMakes
      ? <SelectField
          options={allMakes}
          fieldName='make'
          value={selectedMake}
          onChange={setSelectedMake}
        />
      : <span>Loading makes...</span>
    }
    {
      modelsStatus === 'success' && allModels
      ? <SelectField
        options={allModels}
        fieldName='model'
        value={selectedModel}
        onChange={setSelectedModel}
      />
      : <span>{modelsStatus !== 'idle' && 'Loading models...'}</span>
    }
    {
      vehiclesStatus === 'success' && filteredAllVehicles
      ? <>
        <span>
          There are <span className='numOfVehicles'>{filteredAllVehicles.length}</span> vehicles available.
          Decrease their number with filters.
        </span>
        {
          allEnginePowerPSs && <SelectField
            options={allEnginePowerPSs}
            fieldName='Engine power PS'
            value={selectedEnginePowerPS}
            onChange={setSelectedEnginePowerPS}
          />
        }
        {
          allEnginePowerKWs && <SelectField
            options={allEnginePowerKWs}
            fieldName='Engine power KW'
            value={selectedEnginePowerKW}
            onChange={setSelectedEnginePowerKW}
          />
        }
        {
          allFuelTypes && <SelectField
            options={allFuelTypes}
            fieldName='Fuel type'
            value={selectedFuelType}
            onChange={setSelectedFuelType}
          />
        }
        {
          allBodyTypes && <SelectField
            options={allBodyTypes}
            fieldName='Body type'
            value={selectedBodyType}
            onChange={setSelectedBodyType}
          />
        }
        {
          allEngineCapacity && <SelectField
            options={allEngineCapacity}
            fieldName='Engine capacity'
            value={selectedEngineCapacity}
            onChange={setSelectedEngineCapacity}
          />
        }
        {
          <span
            className='showVehicles'
            onClick={() => setShowVehiclesList(true)}
          >
            {'Show vehicles >>>'}
          </span>
        }
      </>: <span>{vehiclesStatus !== 'idle' && 'Loading vehicles...'}</span>
    }
  </div>
  );
}

export default SelectVehicle;

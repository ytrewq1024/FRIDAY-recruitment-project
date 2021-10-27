import React, { FC, useEffect, useMemo, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { Make, Model, Vehicle } from '../interfaces/api';
import SelectVehicle from './SelectVehicle';

const fetchMakes = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/makes`)
  return response.json()
}

const fetchModels = async (selectedMake: string | null) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/models?make=${selectedMake}`
  )
  return response.json()
}

const fetchVehicles = async (
  selectedMake: string | null,
  selectedModel: string | null,
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/vehicles?make=${selectedMake}&model=${selectedModel}`
  )
  return response.json()
}

const getListsOfAllProperties = (allVehicles: Vehicle[] | undefined) => {
  return {
  allEnginePowerPSs: allVehicles?.map(x => x.enginePowerPS.toString()),
  allEnginePowerKWs: allVehicles?.map(x => x.enginePowerKW.toString()),
  allFuelTypes: allVehicles?.map(x => x.fuelType),
  allBodyTypes: allVehicles?.map(x => x.bodyType),
  allEngineCapacity: allVehicles?.map(x => x.engineCapacity.toString())
}}

const SelectVehicleContainer: FC = () => {
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const [selectedEnginePowerPS, setSelectedEnginePowerPS] = useState<string | null>(null);
  const [selectedEnginePowerKW, setSelectedEnginePowerKW] = useState<string | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedEngineCapacity, setSelectedEngineCapacity] = useState<string | null>(null);

  const [showVehiclesList, setShowVehiclesList] = useState(false);

  // If we get 400+/500+ status from the server, React query will fetch data once again
  const {
    status: makesStatus,
    data: allMakes
  }: UseQueryResult<Make[], Error> = 
    useQuery<Make[], Error>(['makes'], fetchMakes)

  const {
    status: modelsStatus,
    data: allModels,
    refetch: refetchModels
  }: UseQueryResult<Model[], Error> = 
    useQuery<Model[], Error>(
      ['models', selectedMake],
      () => fetchModels(selectedMake),
      {refetchOnWindowFocus: false, enabled: false}
    )

  const {
    status: vehiclesStatus,
    data: allVehicles,
    refetch: refetchVehicles
  }: UseQueryResult<Vehicle[], Error> = 
    useQuery<Vehicle[], Error>(
      ['vehicles', selectedMake, selectedModel],
      () => fetchVehicles(selectedMake, selectedModel),
      {refetchOnWindowFocus: false, enabled: false}
    )
  
  useEffect(() => {
    if (selectedMake) {
      refetchModels()
    }
  }, [selectedMake])

  useEffect(() => {
    if (selectedModel) {
      refetchVehicles()
    }
  }, [selectedModel])

  const filteredAllVehicles = allVehicles && allVehicles
    .filter(vehicle => 
      selectedEnginePowerPS ? (vehicle.enginePowerPS.toString() === selectedEnginePowerPS) : true
    )
    .filter(vehicle => 
      selectedEnginePowerKW ? (vehicle.enginePowerKW.toString() === selectedEnginePowerKW) : true
    )
    .filter(vehicle => 
      selectedFuelType ? (vehicle.fuelType === selectedFuelType) : true
    )
    .filter(vehicle => 
      selectedBodyType ? (vehicle.bodyType === selectedBodyType) : true
    )
    .filter(vehicle => 
      selectedEngineCapacity ? (vehicle.engineCapacity.toString() === selectedEngineCapacity) : true
    )

  const {
    allEnginePowerPSs,
    allEnginePowerKWs,
    allFuelTypes,
    allBodyTypes,
    allEngineCapacity
  } = useMemo(
    () => getListsOfAllProperties(filteredAllVehicles),
    [filteredAllVehicles]
  )
  
  return (
    <SelectVehicle {...{
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
    }} />
  );
}

export default SelectVehicleContainer;

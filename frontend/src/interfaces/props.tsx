import { Make, Model, Vehicle } from "./api";

export interface SelectFieldProps {
  options: any[]
  fieldName: string
  value?: any
  onChange: any
}

export interface SelectCarProps {
  selectedMake: string | null
  selectedModel: string | null
  selectedEnginePowerPS: string | null
  selectedEnginePowerKW: string | null
  selectedFuelType: string | null
  selectedBodyType: string | null
  selectedEngineCapacity: string | null
  allEnginePowerPSs: string[] | undefined
  allEnginePowerKWs: string[] | undefined
  allFuelTypes: string[] | undefined
  allBodyTypes: string[] | undefined
  allEngineCapacity: string[] | undefined
  vehiclesStatus: "idle" | "error" | "loading" | "success"
  allModels: Model[] | undefined
  modelsStatus: "idle" | "error" | "loading" | "success"
  allMakes: Make[] | undefined
  makesStatus: "idle" | "error" | "loading" | "success"
  setSelectedMake: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedEnginePowerPS: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedEnginePowerKW: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedFuelType: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedBodyType: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedEngineCapacity: React.Dispatch<React.SetStateAction<string | null>>
  filteredAllVehicles: Vehicle[] | undefined
  showVehiclesList: Boolean
  setShowVehiclesList: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ListVehiclesProps {
  vehicles: Vehicle[] | undefined
  setShowVehiclesList: React.Dispatch<React.SetStateAction<boolean>>
  selectedMake: string | null
  selectedModel: string | null
}
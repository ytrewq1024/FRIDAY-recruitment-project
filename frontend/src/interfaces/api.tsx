export interface Make {
  name: string
}

export interface Model {
  name: string
}

export interface Vehicle {
  make: string,
  model: string,
  enginePowerPS: number,
  enginePowerKW: number,
  fuelType: string,
  bodyType: string,
  engineCapacity: number
}

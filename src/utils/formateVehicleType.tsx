const formateVehicleType = (type: string) => {
  switch (type) {
    case 'car':
      return 'Car'
    case 'truck':
      return 'Truck'
    case 'SUV':
      return 'SUV'
    case 'van':
      return 'Van'
    case 'motorcycle':
      return 'Motorcycle'
    case 'bus':
      return 'Bus'
    case 'electricVehicle':
      return 'Electric Vehicle'
    case 'hybridVehicle':
      return 'Hybrid Vehicle'
    case 'bicycle':
      return 'Bicycle'
    case 'tractor':
      return 'Tractor'
    default:
      return
  }
}

export default formateVehicleType

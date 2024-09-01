import { TService } from './service.type'
import { TSlot } from './slot.type'
import { TUser } from './user.type'

export type TBooking = {
  _id: string
  customer: TUser
  service: TService
  slot: TSlot
  vehicleType: string
  vehicleModel: string
  vehicleBrand: string
  manufacturingYear: number
  registrationPlate: string
}

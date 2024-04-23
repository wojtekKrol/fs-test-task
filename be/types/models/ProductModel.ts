export interface IProduct {
  image: string
  code: string
  name: string
  color: string
  capacity: number
  dimensions: string
  features: string[]
  energyClass: 'A' | 'B' | 'C'
}

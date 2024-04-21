export interface IPricing {
  productCode: string
  value: number
  currency: string
  installment: {
    value: number
    period: number
  }
  validFrom: Date
  validTo: Date
}

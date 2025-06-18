export interface Product {
  id: string
  name: string
  description: string
  price: number
  status: 'published' | 'draft'
  cover: string
  createdAt: string
}

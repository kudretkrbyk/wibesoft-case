import ProductCard from './ProductCard'
import type { Product } from '@/lib/types/product'

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

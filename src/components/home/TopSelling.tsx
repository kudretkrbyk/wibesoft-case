import type { Product } from '@/lib/types/product'
import ProductCard from '@/components/products/ProductCard'
import ViewAllButton from '@/components/ui/ViewAllButton'

type Props = {
  products: Product[]
  onViewAll?: () => void
}

export default function TopSelling({ products, onViewAll }: Props) {
  return (
    <section className="w-full px-[16px] sm:px-[32px] md:px-[100px] py-[20px] sm:py-[32px]">
      <div className="mx-auto  ">
        <h2 className="mb-[32px] sm:mb-[56px] text-center font-integral text-[32px] sm:text-[48px] font-extrabold leading-[1]">
          TOP SELLING
        </h2>

        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <div
              key={p.id}
              className={`
             ${i >= 2 ? 'hidden md:block' : ''}
           `}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <ViewAllButton onClick={onViewAll} />
      </div>
    </section>
  )
}

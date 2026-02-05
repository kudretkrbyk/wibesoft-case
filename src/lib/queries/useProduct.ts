import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/services/api/requests/services.gen'
import type { GetProductByIdData } from '@/services/api/requests/types.gen'
import type { Product } from '@/lib/types/product'
import { client } from '@/services/api/client'

export function useProduct(id: number | string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    enabled: id !== undefined && id !== null && `${id}`.length > 0,
    retry: false, // ✅ deterministik
    queryFn: async () => {
      try {
        const options: GetProductByIdData = { path: { id: Number(id) } }
        const res = await getProductById({ ...options, client })

        if ((res as any).error) throw (res as any).error

        const data = (res as any).data
        if (!data) throw new Error('Product not found')

        return data as Product
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown network error'
        throw new Error(`Product request failed: ${msg}`)
      }
    },
  })
}

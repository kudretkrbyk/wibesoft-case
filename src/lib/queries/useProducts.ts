import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/api/requests/services.gen'
import type { GetProductsResponse } from '@/services/api/requests/types.gen'
import { client } from '@/services/api/client'

export function useProducts() {
  return useQuery<GetProductsResponse>({
    queryKey: ['products'],
    retry: false, // ✅ her hata sadece user click ile tekrar denensin
    queryFn: async () => {
      const res = await getProducts({ client })
      if ((res as any)?.error) throw (res as any).error
      if (Array.isArray(res)) return res as GetProductsResponse

      const data = (res as any)?.data
      if (!Array.isArray(data))
        throw new Error('Invalid API response for /products')
      return data as GetProductsResponse
    },
  })
}

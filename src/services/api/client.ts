import { client as apiClient } from '@/services/api/requests/services.gen'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


if (!baseUrl) {
  // eslint-disable-next-line no-console
  // console.warn(
  //   'NEXT_PUBLIC_API_BASE_URL is missing. Requests may hit localhost.',
  // )
} else {
  apiClient.setConfig({ baseUrl })
}

export const client = apiClient

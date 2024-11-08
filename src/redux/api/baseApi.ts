/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { toast } from 'sonner'
import { logout, setUser } from '../features/auth/authSlice'

// main base query
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://lvl-2-assignment-3-nine.vercel.app/api', // todo: must change this
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // preparing headers for request
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

// custom base query to catch access token authorization error so that we can send refresh token to get a new access token
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result: { error?: FetchBaseQueryError } = await baseQuery(
    args,
    api,
    extraOptions
  )

  // checking if the user exists or not
  if (result?.error?.status === 404) {
    const errorMessage = (result.error.data as { message: string }).message
    toast.error(errorMessage)
  }

  if (result?.error?.status === 403) {
    const errorMessage = (result.error.data as { message: string }).message
    toast.error(errorMessage)
  }

  const user = (api.getState() as RootState).auth.user

  // checking if the user is authenticated or not
  if (result?.error?.status === 401 && user !== null) {
    // sending refresh token
    const res = await fetch(
      'https://lvl-2-assignment-3-nine.vercel.app/api/auth/refresh-token',
      {
        method: 'POST',
        credentials: 'include'
      }
    )

    const data = await res.json()
    if (data?.data?.accessToken) {
      api.dispatch(setUser({ user, token: data?.data?.accessToken }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ['service', 'slot', 'booking', 'user', 'review']
})

import { createContext, useContext } from 'react'

export const PageDataContext = createContext<any>(null)

export function usePageData() {
  return useContext(PageDataContext)
}

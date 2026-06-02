import { HeaderClient } from './Component.client'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

interface HeaderProps {
  data: HeaderType | null
}

export function Header({ data }: HeaderProps) {
  return <HeaderClient data={data} />
}

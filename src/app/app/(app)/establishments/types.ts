import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getEstablishments } from './actions'

export type Establishment = ReturnTypeWithoutPromise<typeof getEstablishments>[0] 
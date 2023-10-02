import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'

export enum BannerType {
  PSA = 'psa',
}

type BannerState = {
  [BannerType.PSA]: {
    open: boolean
  }
}

const initialState: BannerState = {
  [BannerType.PSA]: {
    open: true,
  },
}

export const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    closePSABanner: (state) => {
      state[BannerType.PSA] = { open: false }
    },
  },
})

export const { closePSABanner } = bannerSlice.actions

export const selectPSABanner = (state: RootState) => state[bannerSlice.name][BannerType.PSA]

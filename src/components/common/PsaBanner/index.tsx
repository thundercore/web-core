import { type ReactElement } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import css from './styles.module.css'
import { useAppDispatch, useAppSelector } from '@/store'
import { closePSABanner, selectPSABanner } from '@/store/bannerSlice'

type BannerType = {
  [key: string]: ReactElement | string
}

const BANNERS: BannerType = {
  WARNING_BANNER: (
    <>
      The ThunderCore Safe project will be discontinued. Kindly request that you move your funds by October 9th. If you
      do not have time to take this action, please seek assistance directly from ThunderCore after the deadline.
    </>
  ),
}
const PsaBanner = (): ReactElement | null => {
  const banner = BANNERS['WARNING_BANNER']

  const dispatch = useAppDispatch()
  const open = useAppSelector(selectPSABanner).open
  const showBanner = banner && open

  const onClose = () => {
    dispatch(closePSABanner())
  }

  return showBanner ? (
    <div className={css.banner}>
      <div className={css.wrapper}>
        <div className={css.content}>{banner}</div>
        <CloseIcon className={css.close} onClick={onClose} />
      </div>
    </div>
  ) : null
}

export default PsaBanner

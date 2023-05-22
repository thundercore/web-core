import type { ReactElement } from 'react'
import { useCallback, useEffect } from 'react'

import {
  SidebarList,
  SidebarListItemButton,
  SidebarListItemIcon,
  SidebarListItemText,
} from '@/components/sidebar/SidebarList'
import { BEAMER_SELECTOR, loadBeamer } from '@/services/beamer'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectCookies, CookieType } from '@/store/cookiesSlice'
import { openCookieBanner } from '@/store/popupSlice'
//import BeamerIcon from '@/public/images/sidebar/whats-new.svg'
//import HelpCenterIcon from '@/public/images/sidebar/help-center.svg'
import SuggestionIcon from '@/public/images/sidebar/lightbulb_icon.svg'
import { ListItem } from '@mui/material'
import DebugToggle from '../DebugToggle'
import { IS_PRODUCTION } from '@/config/constants'
import Track from '@/components/common/Track'
import { OVERVIEW_EVENTS } from '@/services/analytics/events/overview'
import { useCurrentChain } from '@/hooks/useChains'

//const WHATS_NEW_PATH = 'https://help.safe.global/en/'
const SUGGESTION_PATH =
  'https://docs.google.com/forms/d/e/1FAIpQLSfojsADYCiWq9AqbLqsUTzCDSpA8FMgdAQp0Pyl0BOeurlq9A/viewform?usp=sf_link'

const SidebarFooter = (): ReactElement => {
  const dispatch = useAppDispatch()
  const cookies = useAppSelector(selectCookies)
  const chain = useCurrentChain()

  const hasBeamerConsent = useCallback(() => cookies[CookieType.UPDATES], [cookies])

  useEffect(() => {
    // Initialise Beamer when consent was previously given
    if (hasBeamerConsent() && chain?.shortName) {
      loadBeamer(chain.shortName)
    }
  }, [hasBeamerConsent, chain?.shortName])

  const handleBeamer = () => {
    if (!hasBeamerConsent()) {
      dispatch(openCookieBanner({ warningKey: CookieType.UPDATES }))
    }
  }

  return (
    <SidebarList>
      {!IS_PRODUCTION && (
        <ListItem disablePadding>
          <DebugToggle />
        </ListItem>
      )}

      {/* <Track {...OVERVIEW_EVENTS.WHATS_NEW}>
        <ListItem disablePadding>
          <SidebarListItemButton id={BEAMER_SELECTOR} onClick={handleBeamer}>
            <SidebarListItemIcon color="primary">
              <BeamerIcon />
            </SidebarListItemIcon>
            <SidebarListItemText bold>What&apos;s new</SidebarListItemText>
          </SidebarListItemButton>
        </ListItem>
      </Track>

      <Track {...OVERVIEW_EVENTS.HELP_CENTER}>
        <ListItem disablePadding>
          <a target="_blank" rel="noopener noreferrer" href={WHATS_NEW_PATH} style={{ width: '100%' }}>
            <SidebarListItemButton>
              <SidebarListItemIcon color="primary">
                <HelpCenterIcon />
              </SidebarListItemIcon>
              <SidebarListItemText bold>Need help?</SidebarListItemText>
            </SidebarListItemButton>
          </a>
        </ListItem>
      </Track> */}
      <Track {...OVERVIEW_EVENTS.SUGGESTIONS}>
        <ListItem disablePadding>
          <a target="_blank" rel="noopener noreferrer" href={SUGGESTION_PATH} style={{ width: '100%' }}>
            <SidebarListItemButton
              id={BEAMER_SELECTOR}
              style={{ backgroundColor: '#12FF80', color: 'black' }}
              onClick={handleBeamer}
            >
              <SidebarListItemIcon color="primary">
                <SuggestionIcon />
              </SidebarListItemIcon>
              <SidebarListItemText bold>New Features Suggestion?</SidebarListItemText>
            </SidebarListItemButton>
          </a>
        </ListItem>
      </Track>
    </SidebarList>
  )
}

export default SidebarFooter

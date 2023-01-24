import type { NextPage } from 'next'
import Head from 'next/head'
import useTxHistory from '@/hooks/useTxHistory'
import PaginatedTxns from '@/components/common/PaginatedTxns'
import TxHeader from '@/components/transactions/TxHeader'
import { Box } from '@mui/material'
import NavTabs from '@/components/common/NavTabs'
import { transactionNavItems } from '@/components/sidebar/SidebarNavigation/config'
import { useState } from 'react'
import Button from '@mui/material/Button'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TxFilterForm from '@/components/transactions/TxFilterForm'
import { useTxFilter } from '@/utils/tx-history-filter'

const History: NextPage = () => {
  const [filter] = useTxFilter()

  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => {
    setShowFilter((prev) => !prev)
  }

  const ExpandIcon = showFilter ? ExpandLessIcon : ExpandMoreIcon
  return (
    <>
      <Head>
        <title>ThunderCore Safe – Transaction history</title>
      </Head>

      <TxHeader
        action={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <NavTabs tabs={transactionNavItems} />
            <Button variant="outlined" onClick={toggleFilter} size="small" endIcon={<ExpandIcon />}>
              {filter?.type ?? 'Filter'}
            </Button>
          </Box>
        }
      />

      <main>
        {showFilter && <TxFilterForm toggleFilter={toggleFilter} />}
        <PaginatedTxns useTxns={useTxHistory} />
      </main>
    </>
  )
}

export default History

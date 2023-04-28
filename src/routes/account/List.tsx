import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Box, List, ListItem, ListItemText, ListItemButton, ListSubheader, ListItemSecondaryAction } from '@mui/material'
import * as service from '@/services/account'
import { formatAmount } from '@/common/utils'
import Nav from '@/components/Nav'

const ACCOUNT_TYPE_ASSET = 1
const ACCOUNT_TYPE_LIABILITY = 2

export default () => {
  const [count, setCount] = useState(0)
  const [assets, setAssets] = useState<service.Account[]>([])
  const [liabilities, setLiabilities] = useState<service.Account[]>([])

  useEffect(() => { // TODO Loading
    service.getAccountList().then((payload) => {
      setCount(payload.data.length)
      setAssets(_.filter(payload.data, ['type', ACCOUNT_TYPE_ASSET]))
      setLiabilities(_.filter(payload.data, ['type', ACCOUNT_TYPE_LIABILITY]))
    })
  }, [])

  return (
    <Box>
      <Nav title="Quark" />
      <List>
        {count > 0 ? (
          <>
            {assets.length > 0 && (
              <>
                <ListSubheader>Assets</ListSubheader>
                {assets.map(item => (
                  <ListItemButton key={item.id}>
                    <ListItemText>{item.name}</ListItemText>
                    <ListItemSecondaryAction>{formatAmount(item.balance)}</ListItemSecondaryAction>
                  </ListItemButton>
                ))}
              </>
            )}

            {liabilities.length > 0 && (
              <>
                <ListSubheader>Liabilities</ListSubheader>
                {liabilities.map(item => (
                  <ListItemButton key={item.id}>
                    <ListItemText>{item.name}</ListItemText>
                    <ListItemSecondaryAction>{formatAmount(item.balance)}</ListItemSecondaryAction>
                  </ListItemButton>
                ))}
              </>
            )}
          </>
        ) : (
          <ListItem>
            <ListItemText>No data</ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Add as AddIcon,
  MoreVert,
  FilterAlt,
} from '@mui/icons-material'
import type { FilterForm } from '@/services/record'
import SideMenu from '@/components/SideMenu'
import FilterDialog from './FilterDialog'

interface Props {
  filterForm: FilterForm
  onChangeFilterForm: (values: FilterForm) => void
}

export default (props: Props) => {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  function handleOpenFilterDialog() {
    handleClose()
    setFilterDialogOpen(true)
  }

  function handleApplyFilters(values: FilterForm) {
    handleCloseFilters()
    props.onChangeFilterForm(values)
  }

  function handleCloseFilters() {
    setFilterDialogOpen(false)
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Record List</Typography>

          <IconButton size="large" edge="end" color="inherit" onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/record/edit') }}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText>Add Record</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleOpenFilterDialog}>
              <ListItemIcon><FilterAlt /></ListItemIcon>
              <ListItemText>Filter</ListItemText>
            </MenuItem>
          </Menu>
          <FilterDialog
            values={props.filterForm}
            open={filterDialogOpen}
            onApply={handleApplyFilters}
            onClose={handleCloseFilters}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

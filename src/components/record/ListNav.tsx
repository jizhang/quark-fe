import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
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
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  function handleOpenFilterDialog() {
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

          <IconButton size="large" edge="end" color="inherit" onClick={handleOpenFilterDialog}>
            <FilterAlt />
          </IconButton>
          <IconButton size="large" edge="end" color="inherit" component={Link} to="/record/edit">
            <AddIcon />
          </IconButton>

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

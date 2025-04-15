import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  InputAdornment,
  TextField,
  Popover,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setCustomers, setSelectedCustomers, toggleCustomerSelection } from '../../store/slices/masterDataSlice';
import { customersSelectData } from './data';

const CustomerSelect = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
dispatch(setCustomers(customersSelectData))
  },[])

  const {customers,selectedCustomers} = useSelector((state: RootState) => state.masterData);



  const customersData = customers || [];
  const visibleCustomers = customersData.slice(0, 7);
  const hiddenCustomers = customersData.slice(7);

  const colorPalette = ['#FF8A80', '#81C784', '#64B5F6', '#FF80AB', '#B39DDB', '#FFB74D', '#FFD54F'];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
  };
  const open = Boolean(anchorEl);

  const filteredUsers = search
    ? customersData.filter((customer) => customer.fullName.toLowerCase().includes(search.toLowerCase()))
    : hiddenCustomers;

  const handleCustomerClick = (customer: typeof customers[0]) => {
    dispatch(toggleCustomerSelection(customer));
  };

  const handleClearSelection = () => {
    dispatch(setSelectedCustomers([]));
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, ml: '2px' }}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle1">Customer ({selectedCustomers.length})</Typography>
        <Tooltip title="Clear">
          <IconButton size="small" sx={{ mt: '-4px' }} onClick={handleClearSelection}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box display="flex" gap={1}>
        {visibleCustomers.map((customer) => {
          const isSelected = selectedCustomers.some((selected) => selected.customerId === customer.customerId);
          return (
            <Tooltip key={customer.customerId} title={customer.fullName}>
              <Avatar
                onClick={() => handleCustomerClick(customer)}
                sx={{
                  bgcolor: colorPalette[customer.customerId % colorPalette.length],
                  color: 'white',
                  width: 36,
                  height: 36,
                  fontSize: 14,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #1677FF' : 'none'
                }}
              >
                {customer.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </Avatar>
            </Tooltip>
          );
        })}

        {customersData.length > 6 && (
          <IconButton onClick={handleOpen}>
            <Avatar sx={{ bgcolor: 'gray', width: 36, height: 36, fontSize: 14 }}>
              <MoreHorizIcon />
            </Avatar>
          </IconButton>
        )}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
            borderRadius: 2
          }
        }}
      >
        <Box p={2} maxHeight={265} sx={{ overflowY: 'auto' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#D0D3D4', borderWidth: '2px' },
                '&:hover fieldset': { borderColor: '#D0D3D4', borderWidth: '2px' },
                '&.Mui-focused fieldset': { borderColor: '#D0D3D4', borderWidth: '2px' }
              }
            }}
          />

          <List sx={{ maxHeight: 195, overflowY: 'auto' }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((customer) => {
                const isSelected = selectedCustomers.some((selected) => selected.customerId === customer.customerId);
                return (
                  <ListItem
                    key={customer.customerId}
                    onClick={() => handleCustomerClick(customer)}
                    sx={{ borderRadius: '5px', cursor: 'pointer' }}
                  >
                    <ListItemAvatar sx={{ minWidth: '36px' }}>
                      <Avatar
                        sx={{
                          bgcolor: colorPalette[customer.customerId % colorPalette.length],
                          color: 'white',
                          width: 30,
                          height: 30,
                          fontSize: 14,
                          cursor: 'pointer',
                          border: isSelected ? '2px solid #1677FF' : 'none'
                        }}
                      >
                        {customer.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={customer.fullName} />
                    {isSelected && <CheckIcon sx={{ color: '#1677FF' }} />}
                  </ListItem>
                );
              })
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ p: 1 }}>
                No customers found
              </Typography>
            )}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default CustomerSelect;

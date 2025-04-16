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
  Chip
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setLabelTypes, setSelectedLabelTypeIds, toggleLabelType } from '../../store/slices/masterDataSlice';
import { useGetLabelTypesQuery } from '../../store/services/api';

interface LabelType {
  labelTypeId: number;
  labelTypeName: string;
}


const LabelTypeSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

const {data:LabelTyepsData} = useGetLabelTypesQuery();

  useEffect(()=>{
    dispatch(setLabelTypes(LabelTyepsData))
  },[])


  const { labelTypes, selectedLabelTypeIds } = useSelector((state: RootState) => state.masterData);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>('');

  const open = Boolean(anchorEl);
  const visibleLabels = labelTypes?.slice(0, 5) || [];
  const remainingLabels = labelTypes?.slice(5) || [];

  const filteredLabels = search
    ? labelTypes.filter((item: LabelType) =>
        item.labelTypeName.toLowerCase().includes(search.toLowerCase())
      )
    : remainingLabels;

  const handleClear = (): void => {
    dispatch(setSelectedLabelTypeIds([]));
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setSearch('');
  };

  const handleSelect = (id: number): void => {
    dispatch(toggleLabelType(id)); 
  };
  

  return (
    <Box display="flex" flexDirection="column" gap={1} sx={{ mb: 2, ml: '2px' }}>
      <Box display="flex" gap={1} alignItems="center">
        <Typography variant="subtitle1">
          Label Types ({selectedLabelTypeIds.length})
        </Typography>
        <Tooltip title="Clear">
          <IconButton size="small" sx={{ mt: '-4px' }} onClick={handleClear}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap">
        {visibleLabels.map((label: LabelType) => (
         <Tooltip title={label.labelTypeName}>
         <Chip
           key={label.labelTypeId}
           label={
             <Box
               sx={{
                 maxWidth: '150px',
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
               }}
             >
               {label.labelTypeName}
             </Box>
           }
           onClick={() => handleSelect(label.labelTypeId)}
           sx={{
             backgroundColor: selectedLabelTypeIds.includes(label.labelTypeId) ? '#E1ECF4' : '#F4F5F7',
             border: selectedLabelTypeIds.includes(label.labelTypeId) ? '2px solid #1677FF' : 'none',
             color: '#34495E',
             fontSize: 14,
             fontWeight: 500,
             borderRadius: '20px',
             cursor: 'pointer',
             '&:hover': { backgroundColor: '#EAECEF' },
           }}
         />
       </Tooltip>
       
        ))}

        {labelTypes.length > 5 && (
          <IconButton onClick={handleOpen} sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <MoreHorizIcon />
          </IconButton>
        )}

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: { boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', borderRadius: 2 }
          }}
        >
          <Box p={2} maxHeight={265} sx={{ overflowY: 'auto', marginTop: '2px', padding: '8px' }}>
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

            <List
              sx={{
                maxHeight: 195,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px'
              }}
            >
              {filteredLabels.length > 0 ? (
                filteredLabels.map((label: LabelType) => (
                  <ListItem
                    key={label.labelTypeId}
                    onClick={() => handleSelect(label.labelTypeId)}
                    sx={{
                      backgroundColor: selectedLabelTypeIds.includes(label.labelTypeId) ? '#E1ECF4' : '#F4F5F7',
                      border: selectedLabelTypeIds.includes(label.labelTypeId) ? '2px solid #1677FF' : 'none',
                      color: '#34495E',
                      fontSize: 14,
                      fontWeight: 500,
                      padding: '4px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#EAECEF' },
                    }}
                  >
                    <Tooltip title={label.labelTypeName}>
  <ListItemText
    primary={
      <Box
        sx={{
          maxWidth: '200px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label.labelTypeName}
      </Box>
    }
    sx={{ ml: '12px' }}
  />
</Tooltip>

                    {selectedLabelTypeIds.includes(label.labelTypeId) && (
                      <CheckIcon sx={{ color: '#1677FF' }} />
                    )}
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ p: 1 }}>
                  No label types found
                </Typography>
              )}
            </List>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default LabelTypeSelector;

import React, { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import AutoTooltipText from './AutoTooltipText'; // ✅ Same label tooltips

interface AutoSuggestProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  staticOptions?: string[];
  fetchOptions?: (query: string) => Promise<string[]>;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

const AutoSuggest: React.FC<AutoSuggestProps> = ({
  label,
  value,
  onChange,
  staticOptions = [],
  fetchOptions,
  placeholder = '',
  helperText = '',
  error = false,
  disabled = false,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [options, setOptions] = useState<string[]>(staticOptions || []);
  const [loading, setLoading] = useState(false);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (fetchOptions && query.trim()) {
          setLoading(true);
          try {
            const results = await fetchOptions(query);
            setOptions(results);
          } catch (error) {
            console.error('AutoSuggest fetch error:', error);
          }
          setLoading(false);
        }
      }, 400),
    [fetchOptions]
  );

  useEffect(() => {
    if (fetchOptions) {
      debouncedFetch(inputValue);
    } else {
      const filtered = staticOptions.filter(opt =>
        opt?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      setOptions(filtered);
    }
  }, [inputValue, fetchOptions, staticOptions, debouncedFetch]);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" gap={0.5}>
        <AutoTooltipText
          content={label}
          maxLength={30}
          variant="body2"
          sx={{ color: "#656565" }}
          tooltipPlacement="bottom"
          TooltipProps={{ arrow: false }}
        />
        {required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </Box>
      <Autocomplete
        freeSolo
        fullWidth
        options={options}
        inputValue={inputValue}
        value={value}
        loading={loading}
        disabled={disabled}
        onInputChange={(_, newInput) => setInputValue(newInput)}
        onChange={(_, newVal) => onChange(newVal ?? '')}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={18} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
              style: {
                appearance: "none",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                paddingTop:'2px !important',
                "& input": {
                  padding: "6px 12px",
                  color: "black",
                  "&::-ms-reveal": {
                    display: "none",
                  },
                  "&::-ms-clear": {
                    display: "none",
                  },
                },
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default AutoSuggest;

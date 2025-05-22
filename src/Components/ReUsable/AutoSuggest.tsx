import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
// import debounce from 'lodash.debounce';

interface AutoSuggestProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  staticOptions?: string[]; // For client-side filtering
  fetchOptions?: (query: string) => Promise<string[]>; // Server-side search
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
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
      // For static options, simple filter
      const filtered = staticOptions.filter(opt =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
      );
      setOptions(filtered);
    }
  }, [inputValue, fetchOptions, staticOptions, debouncedFetch]);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={options}
      inputValue={inputValue}
      value={value}
      loading={loading}
      disabled={disabled}
      onInputChange={(e, newInput) => setInputValue(newInput)}
      onChange={(e, newVal) => onChange(newVal ?? '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
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
        />
      )}
    />
  );
};

export default AutoSuggest;

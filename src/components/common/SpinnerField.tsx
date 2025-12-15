import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface SpinnerFieldProps {
  label?: string;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const SpinnerField: React.FC<SpinnerFieldProps> = ({
  label = 'Stock',
  initialValue = 1,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => handleChange(Number(e.target.value))}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              onClick={() => handleChange(Math.max(0, value - 1))}
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => handleChange(value + 1)}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ width: 180 }}
    />
  );
};

export default SpinnerField;

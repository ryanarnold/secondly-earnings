import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  CURRENCY,
  END_TIME,
  getNumberFromLocalStorage,
  getStringFromLocalStorage,
  getTimeFromLocalStorage,
  HOURLY_RATE,
  START_TIME,
} from '../utils/user-settings';

function SettingsForm() {
  const [currency, setCurrency] = useState('$');
  const [frequency, setFrequency] = useState('hour');
  const [startTime, setStartTime] = useState(moment().toDate());
  const [endTime, setEndTime] = useState(moment().toDate());
  const [salary, setSalary] = useState(0);

  const handleCurrencyChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setCurrency(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setFrequency(event.target.value);
  };

  const handleChangeStartTime = (newValue: Date | null) => {
    if (newValue) setStartTime(newValue);
  };

  const handleChangeEndTime = (newValue: Date | null) => {
    if (newValue) setEndTime(newValue);
  };

  const handleChangeSalary = (event: any) => {
    setSalary(event.target.value);
  };

  const loadSettingFromStorage = () => {
    const savedCurrency = getStringFromLocalStorage(CURRENCY, '$');
    setCurrency(savedCurrency);

    const savedSalary = getNumberFromLocalStorage(HOURLY_RATE, 100);
    setSalary(savedSalary);

    // TODO: set these default values somewhere else
    const savedStartTime = getTimeFromLocalStorage(START_TIME, 9, 0);
    setStartTime(
      moment().set('hour', savedStartTime.hour()).set('minutes', savedStartTime.minutes()).toDate()
    );

    const savedEndTime = getTimeFromLocalStorage(END_TIME, 18, 0);
    setEndTime(
      moment().set('hour', savedEndTime.hour()).set('minutes', savedEndTime.minutes()).toDate()
    );
  };

  const updateSettingsInLocalStorage = () => {
    localStorage.setItem(CURRENCY, currency);
    localStorage.setItem(HOURLY_RATE, salary.toString());

    const startTimeStr = `${startTime.getHours()}:${startTime.getMinutes()}`;
    const endTimeStr = `${endTime.getHours()}:${endTime.getMinutes()}`;
    localStorage.setItem(START_TIME, startTimeStr);
    localStorage.setItem(END_TIME, endTimeStr);
  };

  useEffect(loadSettingFromStorage, []);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        '& > :not(style)': { m: 1, width: '90%' },
        display: 'grid',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="select-currency-label">Currency</InputLabel>
        <Select
          labelId="select-currency-label"
          id="select-currency"
          value={currency}
          label="Currency"
          onChange={handleCurrencyChange}
        >
          <MenuItem value="$">$</MenuItem>
          <MenuItem value="₱">₱</MenuItem>
          <MenuItem value="₿">₿</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-number"
        label="Salary"
        variant="outlined"
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputLabelProps={{
          shrink: true,
        }}
        value={salary}
        onChange={handleChangeSalary}
      />
      <FormControl fullWidth>
        <InputLabel id="select-frequency-label">Frequency</InputLabel>
        <Select
          labelId="select-frequency-label"
          id="select-frequency"
          value={frequency}
          label="Frequency"
          onChange={handleFrequencyChange}
        >
          <MenuItem value="hour">Per Hour</MenuItem>
          <MenuItem value="day">Per Day</MenuItem>
          <MenuItem value="month">Per Month</MenuItem>
          <MenuItem value="year">Per Year</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          label="Start Time"
          value={startTime}
          onChange={handleChangeStartTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          label="End Time"
          value={endTime}
          onChange={handleChangeEndTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={updateSettingsInLocalStorage}>
        Save
      </Button>
      <Button variant="outlined" href="/earnings">
        Go Back
      </Button>
    </Box>
  );
}

export default SettingsForm;

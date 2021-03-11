import React, { useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { FormContainer, TextFieldContainer, CurrencyContainer } from './styles';

const Form = ({ currencyData, currencyList, handleRemoveCurrency, handleAddCurrency }) => {
    const [btc, setBtc] = useState(``);

    const formatCurrency = (currency) => currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const handleInputChange = (event) => {
        if (!isNaN(event.target.value)) setBtc(event.target.value);
    };

    return (
        <FormContainer noValidate autoComplete='off'>
            <TextFieldContainer>
                <TextField onChange={handleInputChange} value={btc} error={isNaN(btc)} label='Enter the BTC' />
            </TextFieldContainer>
            {currencyData.map((currency) => (
                <CurrencyContainer key={currency.code}>
                    <FormControl variant='outlined'>
                        <InputLabel>{currency.code}</InputLabel>
                        <OutlinedInput
                            value={formatCurrency((btc * currency.rate_float).toFixed(2))}
                            startAdornment={<InputAdornment position='start'>{getSymbolFromCurrency(currency.code)}</InputAdornment>}
                            labelWidth={40}
                        />
                    </FormControl>
                    <IconButton onClick={(code) => handleRemoveCurrency(currency.code)}>
                        <DeleteIcon />
                    </IconButton>
                </CurrencyContainer>
            ))}
            <FormControl>
                {currencyList.length !== 0 && (
                    <Select value='' onChange={handleAddCurrency} displayEmpty>
                        <MenuItem value='' disabled>
                            Add Currency
                        </MenuItem>
                        {currencyList.map((currency) => (
                            <MenuItem key={currency.code} value={currency.code}>{`${getSymbolFromCurrency(currency.code)} ${
                                currency.code
                            }`}</MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>
        </FormContainer>
    );
};

export default Form;

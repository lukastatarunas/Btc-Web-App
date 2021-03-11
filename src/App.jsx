import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/form/Form';

import { AppContainer } from './styles';

import { apiUrl, intervalTime } from './constants';

const App = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        fetchCurrenciesData();
        const interval = setInterval(fetchCurrenciesData, intervalTime);
        return () => clearInterval(interval);
    }, []);

    const fetchCurrenciesData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setCurrencyData((currencies) => Object.keys(response.data.bpi).map((code) => response.data.bpi[code]));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveCurrency = (currencyCode) => {
        setCurrencyData(
            currencyData.filter((currency) => {
                if (currency.code === currencyCode) {
                    setCurrencyList((currencyList) => [...currencyList, currency]);
                }
                return currency.code !== currencyCode;
            }),
        );
    };

    const handleAddCurrency = (event) => {
        setCurrencyList(
            currencyList.filter((currency) => {
                if (currency.code === event.target.value) {
                    setCurrencyData((currencyData) => [...currencyData, currency]);
                }
                return currency.code !== event.target.value;
            }),
        );
    };

    return (
        <AppContainer>
            <Form
                currencyData={currencyData}
                currencyList={currencyList}
                handleRemoveCurrency={handleRemoveCurrency}
                handleAddCurrency={handleAddCurrency}
            />
        </AppContainer>
    );
};

export default App;

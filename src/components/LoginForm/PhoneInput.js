import React, { useState } from "react";

import { TextField, InputAdornment, NativeSelect } from "@mui/material";
import { countryCodes } from "../../data/countryCodes";

const options = countryCodes.map((countryCode) => (
    <option
        key={countryCode}
        value={`+${countryCode}`}
        style={{ textAlign: "center" }}
    >
        {`+${countryCode}`}
    </option>
));

const PhoneInput = ({ onChange }) => {
    const [country, setCountry] = useState("+91");
    const [phone, setPhone] = useState("");

    const countryChangeHandler = (event) => {
        const newCountry = event.target.value;
        setCountry(newCountry);
        onChange(newCountry + phone);
    };

    const phoneChangeHandler = (event) => {
        const newPhone = event.target.value;
        setPhone(newPhone);
        onChange(country + newPhone);
    };

    return (
        <TextField
            autoFocus
            label="Enter phone number"
            value={phone}
            onChange={phoneChangeHandler}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{ width: `${country.length * 1.5}rem` }}
                    >
                        <NativeSelect
                            value={country}
                            onChange={countryChangeHandler}
                        >
                            {options}
                        </NativeSelect>
                    </InputAdornment>
                ),
            }}
            inputProps={{
                autoComplete: "off",
                inputMode: "numeric",
            }}
            placeholder="XXXXXXXXXX"
        />
    );
};

export default PhoneInput;

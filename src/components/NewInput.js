import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";

const NewInput = (props) => {
  const [cityValueS, setCityValueS] = React.useState("");
  const [valueSelectedS, setValueSelectedS] = React.useState({
    id: 1262321,
    name: "Mysore",
    state: "",
    country: "IN",
    coord: {
      lon: 76.649719,
      lat: 12.30722,
    },
  });

  const filterOptions = createFilterOptions({
    limit: 10,
  });

  React.useEffect(() => {
    fetch("data/city.list.json")
      .then((res) => res.json())
      .then((data) => {
        setCityValueS(data);
      });
  }, []);

  // React.useEffect(() => {
  //   props.getCityInfo(valueSelectedS);
  // });


  return (
    <div id="inputs">
        <Autocomplete
          onChange={(e, newVal) => {
            if (newVal !== null) {
              props.getCityInfo(newVal);
            }
          }}
          disablePortal
          filterOptions={filterOptions}
          options={cityValueS}
          getOptionLabel={(option) => {
            return `${option.name}, ${option.country}`;
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
        <Autocomplete
          onChange={(e, newVal) => {
            if (newVal !== null) {
              props.getZoomInfo(newVal);
            }
          }}
          disablePortal
          filterOptions={filterOptions}
          options={[
            { level: "Street", value: 14 },
            { level: "City", value: 10 },
            { level: "State", value: 8 },
          ]}
          getOptionLabel={(option) => {
            return `${option.level}`;
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Zoom Level" />}
        />
    </div>
  );
};

export default NewInput;

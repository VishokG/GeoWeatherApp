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

  const [newCityS, setNewCityS] = React.useState();
  const [newZoomS, setNewZoomS] = React.useState("Street");
  function handleCityChange(e) {
    setNewCityS(e.target.value);
  }

  function handleZoomChange(e) {
    props.getNewZoomInfo(e.target.value);
    setNewZoomS(e.target.value);
    // console.log(e.target.value);
  }

  function handleSubmit(e) {
    props.getCityZoomInfo(newCityS, newZoomS);
    e.preventDefault();
  }

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
      <form className="infoForm" onSubmit={handleSubmit}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <div class="form-group i">
                <input
                  onChange={handleCityChange}
                  type="text"
                  class="form-control"
                  id="city"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="col-md-4 mx-auto">
              <div class="form-group i">
                <select
                  class="form-control"
                  id="zoomLevel"
                  onChange={handleZoomChange}
                >
                  <option disabled selected>
                    Select Zoom
                  </option>
                  <option>Street</option>
                  <option>City</option>
                  <option>State</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 d-grid gap-2 mx-auto">
              <button type="submit" class="btn btn-primary mb-2 i">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInput;

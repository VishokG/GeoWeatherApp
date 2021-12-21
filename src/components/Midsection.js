import React from "react";
import Map from "./Map";
import axios from "axios";
// import Input from "./Input";
import NewInput from "./NewInput";

const Midsection = () => {
  let apiSwitch = React.useRef(0);
  const [newCityInfoS, setNewCityInfoS] = React.useState({
    lat: 12.9762,
    lon: 77.6033,
  });
  const [newZoomInfoS, setNewZoomInfoS] = React.useState("Street");
  let mapElement = React.useRef(0);

  function getMap(map) {
    mapElement.current = map;
  }

  function getCityZoomInfo(c, z) {
    let apiKey;
    if (apiSwitch.current === 0) {
      apiKey = "dbb0fe47ff2f175d19d77494781b73fa";
      apiSwitch.current = 1;
    } else {
      apiKey = "5230a46ba502a0345854c111e6e2c254";
      apiSwitch.current = 0;
    }
    var config = {
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/find?q=${c}&appid=${apiKey}&units=metric`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        if (response.data.list.length === 0) {
          alert(`Please check the Name of the city typed (${c})`);
        } else {
          setNewCityInfoS(response.data.list[0].coord);
          setNewZoomInfoS(z);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getNewZoomInfo(i) {
    setNewZoomInfoS(i);
  }

  React.useEffect(() => {});

  return (
    <div>
      <NewInput
        getCityZoomInfo={getCityZoomInfo}
        getNewZoomInfo={getNewZoomInfo}
      />
      <Map
        getMap={getMap}
        newCityInfo={newCityInfoS}
        newZoomInfo={newZoomInfoS}
      />
    </div>
  );
};

export default Midsection;

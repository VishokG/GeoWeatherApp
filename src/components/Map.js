import React from "react";
import axios from "axios";
import leaflet from "leaflet";
import _, { map } from "lodash";

function Map(props) {

  const [currentState, setCurrentState] = React.useState(1);
  let f = React.useRef(undefined);
  let apiSwitch = React.useRef(0);
  const L = window.L;
  // let startingCoordinates = [12.9716, 77.5946];
  let startingCoordinates = [props.cityInfo.coord.lat, props.cityInfo.coord.lon];

  React.useEffect(() => {
    if(f.current !== undefined) {
      f.current.remove();
    }
  
    var map = L.map("map", {
      zoomControl: false,
      doubleClickZoom: false,
      closePopupOnClick: false,
      zoomSnap: false,
      zoomDelta: false,
      trackResize: false,
      touchZoom: false,
      scrollWheelZoom: false,
    }).setView([startingCoordinates[0], startingCoordinates[1]], props.zoomInfo.value);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 14,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoid3VsZmYyNyIsImEiOiJja3dxaDAxazIwNjV3MnVueDhhdG9mc25kIn0.LCMO8pKVvHXEzZpWDbZ4aQ",
      }
    ).addTo(map);

    f.current = map;
    props.getMap(map);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let iconProperties = {
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
    };

    function addIcontoMap(coordinates) {
      // var myIcon = L.icon({
      //   iconUrl: `https://openweathermap.org/img/wn/$50d@2x.png`,
      //   ...iconProperties
      // });
      // L.marker(coordinates, { icon: myIcon }).addTo(map)
      let apiKey;
      if(apiSwitch.current === 0) {
        apiKey = "dbb0fe47ff2f175d19d77494781b73fa";
        apiSwitch.current = 1;
      }
      else {
        apiKey = "5230a46ba502a0345854c111e6e2c254";
        apiSwitch.current = 0;
      }
      var config = {
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}&units=metric`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          var myIcon = L.icon({
            iconUrl: "icons/" + response.data.weather[0].icon + ".png",
            ...iconProperties,
          });
          L.marker(coordinates, { icon: myIcon })
            .addTo(map)
            .bindPopup(
              `${_.startCase(response.data.weather[0].description)}, ${
                response.data.main.temp
              }°C`
            );
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function arrayPresentWithin(bigArray, smallArray) {
      const arraysAreEqual = (a, b) =>
        a.length === b.length && a.every((v, i) => v === b[i]);
      for (let i = 0; i < bigArray.length; i++) {
        if (arraysAreEqual(bigArray[i], smallArray)) {
          return true;
        }
      }
      return false;
    }

    let reqNo = 0;
    addIcontoMap(startingCoordinates);
    // addIcontoMap([startingCoordinates[0] + (0.9), startingCoordinates[1]+ (1.2)]);
    // for(var i = -2; i < 3; i++) {
    //   for(var j = -2; j < 3; j++) {
    //     addIcontoMap([startingCoordinates[0] + i*(0.9), startingCoordinates[1]+ j*(1.2)]);
    //   }
    // }
    let coordinatesArray = [];
    coordinatesArray.push(startingCoordinates);
    map.on("click", (e) => {
      addIcontoMap([e.latlng.lat, e.latlng.lng])
    });
    let zoomLevelParameters;
    if(props.zoomInfo.value === 8) {
      zoomLevelParameters = [0.9, 1.2];
    }
    else if(props.zoomInfo.value === 10) {
      zoomLevelParameters = [0.3, 0.4];
    }
    else if(props.zoomInfo.value === 14) {
      zoomLevelParameters = [0.01, 0.02];
    }
    map.on("move", (e) => {
      let mapBounds = map.getBounds();
      let mapCenter = mapBounds.getCenter();
      let alphaCoordinate = startingCoordinates;
      let leastDistance = mapCenter.distanceTo(startingCoordinates);
      for (let i = 0; i < coordinatesArray.length; i++) {
        let newDistance = mapCenter.distanceTo(coordinatesArray[i]);
        if (newDistance < leastDistance) {
          alphaCoordinate = coordinatesArray[i];
          leastDistance = newDistance;
        }
      }
      let latestCoordinate = [
        alphaCoordinate[0] +
          Math.sign(mapCenter.lat - alphaCoordinate[0]) * zoomLevelParameters[0],
        alphaCoordinate[1] +
          Math.sign(mapCenter.lng - alphaCoordinate[1]) * zoomLevelParameters[1],
      ];
      if (!arrayPresentWithin(coordinatesArray, latestCoordinate)) {
        if (mapBounds.contains(latestCoordinate)) {
          coordinatesArray.push(latestCoordinate);
          addIcontoMap(latestCoordinate);
          window.K = coordinatesArray;
        }
      }
    });
    
  });

  React.useEffect(() => {
     
  });

  return (
    <div>
      <div
        id="map"
        className="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        tabIndex="0"
      ></div>
    </div>
  );
}

export default Map;

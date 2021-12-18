import React from "react";
import Map from "./Map";
// import Input from "./Input";
import NewInput from "./NewInput";

var defaultCity = {
    id: 1262321,
    name: "Mysore",
    state: "",
    country: "IN",
    coord: {
        lon: 76.649719,
        lat: 12.30722
    }
}

var defaultZoom = {level: "Street", value: 14};

const Midsection = () => {

    const [cityInfoS, setCityInfoS] = React.useState(defaultCity);
    const [zoomInfoS, setZoomInfoS] = React.useState(defaultZoom);
    let mapElement = React.useRef(0);

    function getMap(map) {
        mapElement.current = map;
    }

    function getCityInfo(i) {
        setCityInfoS(i);
    }

    function getZoomInfo(i) {
        setZoomInfoS(i);
    }

    React.useEffect(() => {

    })

    return (
        <div>
            <NewInput 
                getCityInfo={getCityInfo}
                getZoomInfo={getZoomInfo}
            />
            <Map 
                getMap={getMap}
                cityInfo={cityInfoS}
                zoomInfo={zoomInfoS}
            />
        </div>
    )
}

export default Midsection;
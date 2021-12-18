import React from "react";
import "./styles.css";

import i01d from "../data/icons/01d.png";
import i01n from "../data/icons/01n.png";
import i02d from "../data/icons/02d.png";
import i02n from "../data/icons/02n.png";
import i04d from "../data/icons/04d.png";
import i10d from "../data/icons/10d.png";
import i11d from "../data/icons/11d.png";
import i13d from "../data/icons/13d.png";
import i50d from "../data/icons/50d.png";

const Header = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 l lt-section">
          <div id="textbox">
          <div id="title">Geo-Weather App</div>
          <div id="text">Know street level weather from around the world!</div>
          </div>
        </div>
        <div className="col-md-6 l rb-section">
        <table id="imageContainer">
        <tr>
        <td><img src={i01d} /></td>
        <td><img src={i01n} /></td>
        <td><img src={i02d} /></td>
        </tr>
        <tr>
        <td><img src={i02n} /></td>
        <td><img src={i04d} /></td>
        <td><img src={i10d} /></td>
        </tr>
        <tr>
        <td><img src={i11d} /></td>
        <td><img src={i13d} /></td>
        <td><img src={i50d} /></td>
        </tr>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Header;

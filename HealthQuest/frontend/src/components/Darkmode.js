import React from "react";
import "./Darkmode.css"

var darkmode = false;

const DarkSwitch = () => {
    darkmode = !darkmode;
    return (
        <label className="darkswitch">
            <input type="checkbox" />
            <span className="slider" />
        </label>
    );
};

export default DarkSwitch;
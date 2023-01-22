import React from 'react';
import {Typography} from "@mui/material";
import {Header} from "./Panel/Header";
import {Menu} from "./Menu";
import {Panel} from "./Panel";

/**
 * App is the root application for learner-portal.
 * @constructor
 */
export const App = () => {
  return (
    <div className="app">
      <Menu/>
      <Panel/>
    </div>
  );
}

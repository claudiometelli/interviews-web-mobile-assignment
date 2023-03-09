import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../scenes/Home";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
        </Routes>
    );
};

export default MainRoutes;

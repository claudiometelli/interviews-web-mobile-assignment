import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../scenes/Home";
import Login from "../scenes/Login";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    );
};

export default MainRoutes;

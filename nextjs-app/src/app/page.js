"use client";
import React, { useState, useEffect } from "react";
import Signup from "./signup/page";
import CompanyQs from "./companyqs/page";

const FramerEmbed = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://accelerate-estimates.framer.website/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Landing Page"
      />
    </div>
  );
};

export default FramerEmbed;

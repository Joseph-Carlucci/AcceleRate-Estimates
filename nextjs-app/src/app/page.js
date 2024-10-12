'use client';
import React, { useState, useEffect } from 'react';
import Service from './service/page';

const FramerEmbed = () => {
  return (
    // <div style={{ width: '100%', height: '100vh' }}>
    //   <iframe
    //     src="https://accelerate-estimates.framer.website/"
    //     style={{ width: '100%', height: '100%', border: 'none' }}
    //     title="Landing Page"
    //   />
    // </div>
    <Service/>
  );
};

export default FramerEmbed;
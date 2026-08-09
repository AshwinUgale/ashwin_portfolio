import React from 'react';

// Backdrop: deep ink, soft ambient glows, and film grain. No cursor light.
const Atmosphere = () => (
  <>
    <div className="fixed inset-0 -z-10" style={{ background: 'hsl(var(--paper))' }} />
    <div className="ambient -z-10" />
    <div className="grain" />
  </>
);

export default Atmosphere;

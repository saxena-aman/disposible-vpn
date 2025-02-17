"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
        { location: [52.3676, 4.9041], size: 0.05 }, // Amsterdam
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [50.1109, 8.6821], size: 0.05 }, // Frankfurt
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [28.6139, 77.2090], size: 0.05 }, // Delhi
        { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy(); // Cleanup to prevent memory leaks
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }} />;
};


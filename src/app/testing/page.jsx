"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [vpnName, setVpnName] = useState("");
  const [location, setLocation] = useState("");
  const [cloudProvider, setCloudProvider] = useState(""); // NEW STATE
  const [loading, setLoading] = useState(false);


  // Get API Base URL from environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!vpnName || !location || !cloudProvider) {
      alert("Please enter a VPN name, select a location, and choose a cloud provider.");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = `${BASE_URL}/create_vpn?name=${encodeURIComponent(
        vpnName
      )}&region=${encodeURIComponent(location)}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        `VPN "${vpnName}" deployed in ${location}!\nResponse: ${JSON.stringify(
          data
        )}`
      );
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to deploy VPN. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVpnName("");
    setLocation("");
    setCloudProvider("");
  };

  return (
    <>
      <div className="relative z-20 lg:py-8 max-w-7xl mx-auto h-full w-full">
        {/* <LampContainer>
        
      </LampContainer> */}
        <div className="px-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Packed with thousands of features
          </h4>

          <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            From Image generation to video generation, Everything AI has APIs
            for literally everything. It can even create this website copy for
            you.
          </p>
        </div>
        <div className="relative flex justify-center mt-10">
          <BackgroundGradient containerClassName="rounded-[22px] p-[4px]">
            <div className="bg-white dark:bg-zinc-900 flex flex-col md:flex-row gap-4 xl:border border-neutral-200 dark:border-neutral-800 rounded-[22px] w-full">
              {/* Left Section - VPN Form */}
              <div className="w-full md:w-1/2">
                <Card className="w-full h-full bg-transparent shadow-none border-r border-neutral-200 dark:border-neutral-800 rounded-l-[22px]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between mt-4 mb-2">
                      <div>Create VPN</div>
                      <div>{/* <ModeToggle /> */}</div>
                    </CardTitle>
                    <CardDescription>
                      Deploy your new VPN in one click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-full">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-4">
                        {/* VPN Name Input */}
                        <div className="flex flex-col space-y-2.5">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Name of your VPN"
                            value={vpnName}
                            onChange={(e) => setVpnName(e.target.value)}
                            required
                            className="w-full"
                          />
                        </div>

                        {/* Location Select Dropdown */}
                        <div className="flex flex-col space-y-2.5">
                          <Label htmlFor="location">Location</Label>
                          <Select onValueChange={setLocation} value={location}>
                            <SelectTrigger id="location" className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="San Francisco">
                                San Francisco
                              </SelectItem>
                              <SelectItem value="Amsterdam">
                                Amsterdam
                              </SelectItem>
                              <SelectItem value="Singapore">
                                Singapore
                              </SelectItem>
                              <SelectItem value="Frankfurt">
                                Frankfurt
                              </SelectItem>
                              <SelectItem value="Sydney">Sydney</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {/* Cloud Provider Select Dropdown */}
                        <div className="flex flex-col space-y-2.5">
                          <Label htmlFor="cloudProvider">Cloud Provider</Label>
                          <Select
                            onValueChange={setCloudProvider}
                            value={cloudProvider}
                          >
                            <SelectTrigger
                              id="cloudProvider"
                              className="w-full"
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="AWS">AWS</SelectItem>
                              <SelectItem value="Google Cloud">
                                Google Cloud
                              </SelectItem>
                              <SelectItem value="Azure">Azure</SelectItem>
                              <SelectItem value="DigitalOcean">
                                DigitalOcean
                              </SelectItem>
                              <SelectItem value="Linode">Linode</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Buttons */}
                      <CardFooter className="flex justify-between pt-4 w-full">
                        <HoverBorderGradient
                          containerClassName="rounded-full"
                          as="button"
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2 bg-white text-black dark:bg-black dark:text-white flex items-center space-x-2"
                        >
                          <span>Reset</span>
                        </HoverBorderGradient>

                        <HoverBorderGradient
                          containerClassName="rounded-full"
                          as="button"
                          type="submit"
                          disabled={loading}
                          className={`px-6 py-2 bg-white text-black dark:bg-black dark:text-white flex items-center space-x-2 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <span>{loading ? "Deploying..." : "Deploy"}</span>
                        </HoverBorderGradient>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - FeatureCard */}
              <div className="w-full md:w-1/2">
                <FeatureCard className="border-b lg:border-none h-full">
                  <FeatureTitle>Deploy in seconds</FeatureTitle>
                  <FeatureDescription>
                    With our blazing fast, state of the art, cutting-edge, we
                    are so back cloud services (read AWS) - you can deploy your
                    model in seconds.
                  </FeatureDescription>
                  <div className="h-full w-full">
                    <SkeletonFour />
                  </div>
                </FeatureCard>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
      <ShootingStars
        minSpeed={1}
        maxSpeed={10}
        minDelay={2100}
        maxDelay={3000}
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        starWidth={25}
        starHeight={1}
      />
      <StarsBackground starDensity={0.0005} />
    </>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div
      className={cn(
        `p-2 sm:p-8 relative overflow-hidden rounded-[22px]`,
        className
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }) => {
  const canvasRef = useRef(null);
  const locationCoordinates = {
    "San Francisco": [37.7749, -122.4194],
    "Amsterdam": [52.3676, 4.9041],
    "Singapore": [1.3521, 103.8198],
    "Frankfurt": [50.1109, 8.6821],
    "Sydney": [-33.8688, 151.2093],
    "Delhi": [28.6139, 77.2090],
    "Bangalore": [12.9716, 77.5946],
  };
  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

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
      markers: Object.values(locationCoordinates).map((coords) => ({
        location: coords,
        size: 0.05, // Adjust marker size
      })),
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

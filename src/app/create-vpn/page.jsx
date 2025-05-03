"use client";
import React from "react";
import Head from "next/head";
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
import { useEffect } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Globe } from "@/components/ui/globe";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
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
  const [cloudProvider, setCloudProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const loadingStates = [
    {
      text: "Creating New Virtual Machine",
    },
    {
      text: "Installing Required Software",
    },
    {
      text: "Creating Configuration File",
    },
    {
      text: "Uploading Configuration File",
    },
    {
      text: "Creating Link for Configuration File",
    },
    {
      text: "Your VPN is Ready",
    }
  ];
  // Get API Base URL from environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!vpnName || !location || !cloudProvider) {
      alert(
        "Please enter a VPN name, select a location, and choose a cloud provider."
      );
      return;
    }

    setLoading(true);
    setIsFlipped(true);
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

    //   // Flip the card to show success message
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
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  useEffect(() => {
    // Hide scroll when component mounts
    document.body.style.overflow = "hidden";

    // Cleanup - restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []); // Empty dependency array = runs once on mount
  return (
    <>
      <title>Create VPN</title>
      <div className="relative z-20 lg:py-8 max-w-7xl mx-auto h-full w-full grid place-items-center">
        <div className="px-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Packed with thousands of features
          </h4>

          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            From Image generation to video generation, Everything AI has APIs
            for literally everything. It can even create this website copy for
            you.
          </p>
        </div>

        {/* Card container with perspective */}
        <div
          className="relative flex justify-center mt-10 w-[80%]"
          style={{ perspective: "1500px" }}
        >
          {/* Card wrapper that rotates */}
          <div
            className="w-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              height: "100%",
            }}
          >
            {/* Front of the card */}
            <div
              className="w-full absolute backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                zIndex: isFlipped ? 0 : 1,
              }}
            >
              <BackgroundGradient containerClassName="rounded-[22px] p-[4px]">
                <div className="bg-white dark:bg-zinc-900 flex flex-col md:flex-row gap-4 xl:border border-neutral-200 dark:border-neutral-800 rounded-[22px] w-full">
                  {/* Left Section - VPN Form */}
                  <div className="w-full md:w-1/2">
                    <Card className="w-full h-full bg-transparent shadow-none border-r border-neutral-200 dark:border-neutral-800 rounded-l-[22px] rounded-r-[0px]">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between mt-4 mb-2">
                          <div>Create VPN</div>
                          <div>
                            <button
                              onClick={handleFlip}
                              className="text-sm text-blue-500 hover:underline"
                            >
                              View Info
                            </button>
                          </div>
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
                              <Select
                                onValueChange={setLocation}
                                value={location}
                              >
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
                              <Label htmlFor="cloudProvider">
                                Cloud Provider
                              </Label>
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
                        With our blazing fast, state of the art, cutting-edge,
                        we are so back cloud services (read AWS) - you can
                        deploy your model in seconds.
                      </FeatureDescription>
                      <div className="h-full w-full">
                        <SkeletonFour />
                      </div>
                    </FeatureCard>
                  </div>
                </div>
              </BackgroundGradient>
            </div>

            {/* Back of the card */}
            <div
              className="w-full absolute backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                zIndex: isFlipped ? 1 : 0,
              }}
            >
              <BackgroundGradient containerClassName="rounded-[22px] p-[4px]">
                <Card className="bg-white dark:bg-zinc-900 rounded-[22px] w-full h-[450px]">
                  <div className="w-full h-[60vh] flex items-center justify-center">
                    {/* Core Loader Modal */}
                    <Loader
                      loadingStates={loadingStates}
                      loading={loading}
                      duration={120000}
                    />

                    {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
                    {/* <button
                      onClick={() => setLoading(true)}
                      className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
                      style={{
                        boxShadow:
                          "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
                      }}
                    >
                      Click to load
                    </button> */}

                    {loading && (
                      <button
                        className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                        onClick={() => setLoading(false)}
                      >
                        <IconSquareRoundedX className="h-10 w-10" />
                      </button>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between mt-4 mb-2">
                      <div>VPN Information</div>
                      <div>
                        <button
                          onClick={handleFlip}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Back to Form
                        </button>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {vpnName
                        ? `Your "${vpnName}" VPN details`
                        : "VPN details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {vpnName ? (
                        <>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Deployment Successful!
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              Your VPN has been successfully deployed with the
                              following configurations:
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Name</p>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {vpnName}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium">Location</p>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {location}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Cloud Provider
                              </p>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {cloudProvider}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium">Status</p>
                              <p className="text-sm text-green-500">Active</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Connection Details
                            </h3>
                            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md">
                              <p className="text-sm font-mono">
                                IP: 192.168.X.X
                                <br />
                                Port: XXXX
                                <br />
                                Protocol: OpenVPN
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-60">
                          <p className="text-center text-neutral-500 dark:text-neutral-400">
                            Complete the form to see your VPN details
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-4">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      type="button"
                      onClick={handleFlip}
                      className="px-6 py-2 bg-white text-black dark:bg-black dark:text-white"
                    >
                      <span>Back to Form</span>
                    </HoverBorderGradient>
                  </CardFooter>
                </Card>
              </BackgroundGradient>
            </div>
          </div>
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
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

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
import { useEffect } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
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
export default function Home() {
  const [vpnName, setVpnName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Singapore");
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
    },
  ];
  // Get API Base URL from environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_WEBHOOK;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!vpnName || !location || !email) {
      return;
    }

    setLoading(true);
    setIsFlipped(true);
    try {
      const apiUrl = `${BASE_URL}?name=${encodeURIComponent(
        vpnName
      )}&region=${encodeURIComponent(location)}&email=${encodeURIComponent(
        email
      )}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

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
            Seamlessly Secure Your Digital Life
          </h4>

          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            From instant privacy to robust online protection, our Disposable VPN
            empowers your digital journey. Effortless setup, ultimate peace of
            mind.
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
                            <div className="flex flex-col space-y-2.5">
                              <Label htmlFor="name">Email</Label>
                              <Input
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                              />
                            </div>
                            {/* Location Select Dropdown */}
                            <div className="flex flex-col space-y-2.5">
                              <Label htmlFor="location">Location</Label>
                              <Select
                                onValueChange={setLocation}
                                defaultValue="Singapore" // Set the default value here
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
                            {/* <div className="flex flex-col space-y-2.5">
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
                            </div> */}
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
                      <FeatureTitle>
                        Instant Deployment, Global Reach
                      </FeatureTitle>
                      <FeatureDescription>
                        Our lightning-fast, cutting-edge cloud infrastructure
                        (including AWS) ensures your disposable VPN is live in
                        moments. Experience seamless, ironclad protection,
                        wherever you are.
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
                <Card className="bg-white dark:bg-zinc-900 rounded-[22px] w-full min-h-[450px]">
                  {loading && (
                    <div className="w-full h-[60vh] flex items-center justify-center">
                      <Loader
                        loadingStates={loadingStates}
                        loading={loading}
                        duration={2000}
                      />
                      <button
                        className="absolute top-4 right-4 text-black dark:text-white z-20"
                        onClick={() => setLoading(false)}
                      >
                        <IconSquareRoundedX className="h-10 w-10" />
                      </button>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between mt-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        Wireguard VPN Setup
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Follow these simple steps to connect to your VPN
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white mb-1">
                          Install Wireguard Client
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          Download and install Wireguard client software on your
                          PC or mobile device from the official website.
                        </p>
                        <a
                          href="https://www.wireguard.com/install/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                        >
                          Download Wireguard
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white mb-1">
                          Check Your Email
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          You will receive an email with the client
                          configuration file download link within 2 minutes of
                          deployment.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white mb-1">
                          Download Configuration File
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Click the download button in the email to get your
                          personalized Wireguard configuration file.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white mb-1">
                          Connect & Enjoy
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Open Wireguard client, import your configuration file,
                          and click connect. You're now securely connected to
                          your VPN!
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-center pt-4">
                    <div className="text-center">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Need help? Contact our support team
                      </p>
                    </div>
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

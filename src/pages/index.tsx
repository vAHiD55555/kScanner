/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { type TryChar, useIPScanner } from "~/hooks/useIPScanner";
import { download } from "~/helpers/download";
import {
  TableCellsIcon,
  DocumentTextIcon,
  ArrowPathRoundedSquareIcon,
  MagnifyingGlassCircleIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import { copyIPToClipboard } from "~/helpers/copyIPToClipboard";
import { allIps } from "~/consts";
import { useUserIPInfo } from "~/hooks/useUserIPInfo";
const UserIP = dynamic(() => import("~/components/UserIP"), { ssr: false });

const Home: NextPage = () => {
  const { ipInfo } = useUserIPInfo();
  const {
    startScan,
    stopScan,
    color,
    currentIP,
    currentLatency,
    ipRegex,
    maxIPCount,
    maxLatency,
    scanState,
    testNo,
    tryChar,
    validIPs,
    setSettings,
  } = useIPScanner({ allIps });

  const isRunning = scanState !== "idle";

  const tryCharToRotation: Record<TryChar, string> = {
    "": "rotate-[360deg]",
    "|": "rotate-[72deg]",
    "/": "rotate-[144deg]",
    "-": "rotate-[216deg]",
    "\\": "rotate-[288deg]",
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر</title>
        <meta name="description" content="Cloudflare Clean IP Scanner" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://scanner.github1.cloud/" />
        <meta name="twitter:title" content="Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر" />
        <meta name="twitter:description" content="Cloudflare Clean IP Scanner" />
        <meta name="twitter:image" content="/icons/twitter.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر" />
        <meta property="og:description" content="Cloudflare Clean IP Scanner" />
        <meta property="og:site_name" content="Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر" />
        <meta property="og:url" content="https://scanner.github1.cloud/" />
        <meta property="og:image" content="/icons/og.png" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* add the following only if you want to add a startup image for Apple devices. */}
        {/* <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_2048.png"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1668.png"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1536.png"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1125.png"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1242.png"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_750.png"
          sizes="750x1334"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_640.png"
          sizes="640x1136"
        /> */}
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <main className="flex h-full max-w-full flex-col items-center justify-center px-3">
        <div className="max-h-full w-[900px] max-w-full rounded-lg bg-slate-200 p-5 text-gray-700">
          <section className="flex flex-col items-center border-b-4 border-cyan-600">
            <div className="w-full border-b-4 border-cyan-600 py-4 text-center">
              <h1 className="text-3xl font-bold text-cyan-900">
                Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر{" "}
                <MagnifyingGlassCircleIcon className="mb-2 inline-block h-10 w-10" />
              </h1>
            </div>
              <div className="flex w-full items-center justify-center py-4">
                <label className="inline-flex h-12 items-center justify-center rounded-lg bg-white p-2">
                  Max Count:
                  <input
                    type="number"
                    id="max-ip"
                    value={maxIPCount}
                    onChange={(e) =>
                      setSettings({ maxIPCount: e.target.valueAsNumber })
                    }
                    disabled={isRunning}
                    min={1}
                    max={500}
                    className="ml-2 rounded-md border-0 px-2 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </label>
                <label className="inline-flex h-12 items-center justify-center rounded-lg bg-white p-2">
                  Maximum Delay:
                  <input
                    type="number"
                    id="max-latency"
                    value={maxLatency}
                    disabled={isRunning}
                    onChange={(e) =>
                      setSettings({ maxLatency: e.target.valueAsNumber })
                    }
                    min={150}
                    max={3000}
                    step={50}
                    className="ml-2 rounded-md border-0 px-2 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </label>
              </div>
            <div className="flex w-full items-center justify-center py-4">
              <label className="inline-flex h-12 items-center justify-center rounded-lg bg-white p-2">
                Regex for IP:
                <input
                  type="text"
                  value={ipRegex}
                  onChange={(e) => setSettings({ ipRegex: e.target.value })}
                  disabled={isRunning}
                  id="ip-regex"
                  placeholder="^104\.17\.|^141\."
                  className="ml-2 rounded-md border-0 px-2 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                />
              </label>
            </div>
            <div className="h-16">
              <UserIP
                ip={ipInfo.ipAddress}
                location={
                  ipInfo.ipVersion === 4
                    ? ipInfo.regionName + ", " + ipInfo.countryName
                    : "..."
                }
              />
            </div>
            <div className="flex w-full flex-col items-center justify-around py-4 md:w-1/2 md:flex-row">
              {!isRunning ? (
                <button
                  className="rounded bg-cyan-500 px-4 py-2 font-bold text-white outline-cyan-700 transition-colors duration-300 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:outline-white disabled:hover:bg-gray-800"
                  onClick={startScan}
                >
                  Start Scan{" "}
                  <PlayIcon className="inline-block h-6 w-6 pb-0.5" />
                </button>
              ) : (
                <button
                  className="rounded bg-cyan-500 px-4 py-2 font-bold text-white outline-cyan-700 transition-colors duration-300 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:outline-white disabled:hover:bg-gray-800"
                  type="button"
                  onClick={stopScan}
                  disabled={scanState === "stopping"}
                >
                  Stop Scan <StopIcon className="inline-block h-6 w-6 pb-0.5" />
                </button>
              )}
            </div>
          </section>
          <section className="my-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="text-center text-red-500">
              Notice: Please turn off your vpn!
            </div>
            <div className="text-center font-bold">Test No: {testNo}</div>
            <div
              className={`${
                color === "red" ? "text-red-500" : "text-green-500"
              } text-center`}
            >
              {currentIP || "0.0.0.0"}
            </div>
            <div className="flex items-center justify-center md:col-span-3">
              <ArrowPathRoundedSquareIcon
                className={`mx-2 inline-block h-6 w-6 transform-gpu text-center text-blue-600 duration-300 ${tryCharToRotation[tryChar]}`}
              />
              <div className="mx-2 text-center">Latency: {currentLatency}</div>
              <TableCellsIcon
                onClick={() => download(validIPs, "csv")}
                title="Download as CSV"
                className={
                  (validIPs.length > 0
                    ? "cursor-pointer text-blue-600 transition-colors duration-300 hover:text-blue-500 "
                    : "cursor-not-allowed text-gray-500 transition-colors duration-300 hover:text-gray-400 ") +
                  "mx-2 h-6 w-6"
                }
              />
              <DocumentTextIcon
                onClick={() => download(validIPs, "json")}
                title="Download as JSON"
                className={
                  (validIPs.length > 0
                    ? "cursor-pointer text-blue-600 transition-colors duration-300 hover:text-blue-500 "
                    : "cursor-not-allowed text-gray-500 transition-colors duration-300 hover:text-gray-400 ") +
                  "mx-2 h-6 w-6"
                }
              />
            </div>
          </section>
          <section className="h-40 max-h-40 overflow-y-scroll">
            <table className="w-full">
              <thead className=" ">
                <tr>
                  <th className="sticky top-0 rounded-bl rounded-tl bg-cyan-300">
                    No #
                  </th>
                  <th className="sticky top-0 bg-cyan-300">IP</th>
                  <th className="sticky top-0 rounded-br rounded-tr bg-cyan-300">
                    Latency
                  </th>
                </tr>
              </thead>
              <tbody>
                {validIPs.map(({ ip, latency }, index) => (
                  <tr key={ip}>
                    <td className="text-center">{index + 1}</td>
                    <td
                      onClick={() => copyIPToClipboard(ip)}
                      className="cursor-pointer text-center transition-colors duration-200 hover:text-gray-500"
                    >
                      {ip}
                    </td>
                    <td className="text-center">{latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <div className="clearfix"></div>
        <footer className="flex h-24 w-full items-center justify-center">
          © kiomarzsss, IRCF, VahidFarid, goldsrc
        </footer>
      </main>
    </>
  );
};

export default Home;

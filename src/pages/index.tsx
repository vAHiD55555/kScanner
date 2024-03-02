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
                <title>Cloudflare Scanner | اسکنر آیپی تمیز کلودفلر</title>
                <meta
                    name="description"
                    content="Cloudflare Scanner to find clean ip"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 col-centered">
                        <a href=".">
                            <img src="img/cflogo.png?v1.1" alt="logo" />
                            <h1>اینترنت برای همه؛ یا هیچ‌کس!</h1>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="clearfix"></div>
            <div className="container">
                <section className="col-lg-6 col-md-8 col-sm-12 col-xs-12 col-centered">
                    <ul className="nav nav-tabs">
                        <li>
                            <a href="https://ircf.space">معرفی</a>
                        </li>
                        <li className="active">
                            <a href="http://scanner.github1.cloud/">اسکنر</a>
                        </li>
                        <li className="pull-left">
                            <a href="https://ircf.space/contacts.php">تماس‌باما</a>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                    <div className="form-group">
                        <label>
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
                                max={100}
                                className="form-control dirLeft"
                            />
                        </label>
                        <label>
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
                                className="form-control dirLeft"
                            />
                        </label>
                    </div>
                    <div className="clearfix"></div>
                    <label>
                        Regex for IP:
                        <input
                            type="text"
                            value={ipRegex}
                            onChange={(e) => setSettings({ ipRegex: e.target.value })}
                            disabled={isRunning}
                            id="ip-regex"
                            placeholder="^104\.17\.|^141\."
                            className="form-control dirLeft"
                        />
                    </label>
                    <div className="clearfix"></div>
                    { typeof ipInfo !== "undefined" && ipInfo.countryCode !== 'IR' && (
                        <>
                            <div className="alert alert-danger text-center">
                                Notice: Please turn off your vpn!
                            </div>
                        </>
                    )}
                    {/*<div className="alert alert-info">
                        <UserIP
                            ip={ipInfo.ipAddress}
                            location={
                                ipInfo.ipVersion === 4
                                    ? ipInfo.regionName + ", " + ipInfo.countryName
                                    : "..."
                            }
                        />
                    </div>*/}
                    <div className="clearfix"></div>
                    {!isRunning ? (
                        <button className="btn btn-block btn-primary" onClick={startScan}>
                            Start Scan <PlayIcon className="inline-block h-6 w-6 pb-0.5" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-block btn-warning"
                            type="button"
                            onClick={stopScan}
                            disabled={scanState === "stopping"}
                        >
                            Stop Scan <StopIcon className="inline-block h-6 w-6 pb-0.5" />
                        </button>
                    )}
                    <div className="clearfix"></div>
                    <hr />
                    <div className="itemDesc">
                        <div className="itemDesc_info text-center">Test #{testNo}</div>
                        <div
                            className={`itemDesc_info ${
                                color === "red" ? "text-red-500" : "text-green-500"
                            } text-center`}
                        >
                            {currentIP || "0.0.0.0"}
                        </div>
                        <div className="itemDesc_info">
                            <small>{currentLatency ? '('+currentLatency+')' : ''}</small>
                        </div>
                        <div className="itemDesc_info icons">
                            <ArrowPathRoundedSquareIcon
                                className={`mx-2 inline-block h-6 w-6 transform-gpu text-center text-blue-600 duration-300 ${tryCharToRotation[tryChar]}`}
                            />
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
                            {/*<DocumentTextIcon
                                onClick={() => download(validIPs, "json")}
                                title="Download as JSON"
                                className={
                                    (validIPs.length > 0
                                        ? "cursor-pointer text-blue-600 transition-colors duration-300 hover:text-blue-500 "
                                        : "cursor-not-allowed text-gray-500 transition-colors duration-300 hover:text-gray-400 ") +
                                    "mx-2 h-6 w-6"
                                }
                            />*/}
                        </div>
                    </div>
                    { validIPs.length > 0 ? (
                        <>
                            <div className="clearfix"></div>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th className="text-center">
                                        #
                                    </th>
                                    <th className="text-center">IP</th>
                                    <th className="text-center">
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
                        </>
                    ) : (
                        <></>
                    )}
                </section>
                <div className="clearfix"></div>
                <footer className="text-center">
                    © kiomarzsss, IRCF, VahidFarid, goldsrc
                    <br />
                </footer>
            </div>
        </>
    );
};

export default Home;

import axios from "axios";
import { useEffect } from "react";

export default function Playground() {
  useEffect(() => {
    axios({
      url: "http://104.16.25.2/cdn-cgi/trace",
      method: "GET",
      timeout: 3000,
    })
      .then((res) => console.log(res))
      .catch(() => {});
  }, []);
  return <></>;
}

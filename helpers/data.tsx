import axios from "axios";
import { cache } from "react";

export class Helpers {
  static fetchData = cache(async (url: string) => {
    return axios({
      method: "GET",
      url: url,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return undefined;
      });
  });
}

type ApiRequestInit = Omit<RequestInit, "body"> & { body?: any };

function fetchApi(input: string | URL, init?: ApiRequestInit) {
  const url = new URL(input, process.env.NEXT_PUBLIC_API_URL);
  const headers: HeadersInit = {};

  if (init?.body) {
    const body = JSON.stringify(init?.body);
    headers["Content-Type"] = "application/json";

    if (localStorage && localStorage.getItem("jwt")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("jwt");
    }

    return fetch(url.href, {
      ...init,
      headers,
      body,
    });
  } else {
    return fetch(url.href, { ...init, headers });
  }
}

export const api = {
  get(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "GET" });
  },
  post(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "POST" });
  },
  put(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "PUT" });
  },
  delete(input: string | URL, init?: ApiRequestInit) {
    return fetchApi(input, { ...init, method: "DELETE" });
  },
};

import { ApiError } from "@spin-spot/models";

type ApiRequestInit = Omit<RequestInit, "body"> & { body?: any };

async function fetchApi(input: string | URL, init?: ApiRequestInit) {
  const url = new URL(input, process.env.NEXT_PUBLIC_API_URL);
  const headers: HeadersInit = {};

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("JWT_TOKEN");
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (init?.body) {
    const body = JSON.stringify(init?.body);
    headers["Content-Type"] = "application/json";

    const res = await fetch(url.href, {
      ...init,
      headers,
      body,
      credentials: "include",
    });

    if (!res.ok) {
      throw new ApiError(await res.json());
    }

    return res;
  } else {
    const res = await fetch(url.href, {
      ...init,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      throw new ApiError(await res.json());
    }

    return res;
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

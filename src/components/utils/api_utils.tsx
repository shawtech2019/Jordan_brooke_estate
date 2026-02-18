import axios from "axios";

export const APP_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:9000/api"
  : "https://your-production-api.com/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const httpPostWithoutToken = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${APP_API_URL}/${url}`, data);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return { error: "Network error. Please try again." };
    }

    const msg =
      error?.response?.data?.message || "Something went wrong";

    return {
      error: msg,
      message: msg,
      status: error?.response?.status,
    };
  }
};


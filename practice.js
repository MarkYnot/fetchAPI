const URL_TIMEOUT = "https://user1713861685783.requestly.tech/timeout";
const URL_200 = "https://user1713861685783.requestly.tech/orders";
const URL_500 = "https://user1713861685783.requestly.tech/flights";

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.response = response;    
  }
}

const response = async (url) => {
  try {
    const data = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    
    if (!data.ok) {
      throw new HttpError(data); //http error library; class
    }
    const result = await data.json();
    console.log(result);

  } catch (error) {

    if (error.name === "TimeoutError") {
      console.log("Request Timed out");
    }

    if (error instanceof HttpError) {
      if (error.response.status === 500) {
        console.log("Server Down");
      } else if (error.response.status === 404) {
        console.log("Not Found");
      }
    }
  }
};

response(URL_TIMEOUT);

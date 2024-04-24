const URL_TIMEOUT = "https://user1713861685783.requestly.tech/timeout";
const URL_200 = "https://user1713861685783.requestly.tech/orders";
const URL_500 = "https://user1713861685783.requestly.tech/flight";

const response = async (url) => {
  fetch(url, {
    method: "GET",
    signal: AbortSignal.timeout(3000),
  })
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((error) => {
      if (error.name === "TimeoutError") {
        console.log("Request is timeout");
      }
      console.log("error:", error);
    });
};

response(URL_500);

export const PostDate = (req: any, path: string) => {
  const url = "http://172.17.0.1:8443/app/v1/plant";
  const data = {
    imageKey: path,
    day: new Date(),
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      key: "83478174581347835789132478103574",
    },
    body: JSON.stringify(data),
  };
  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(`Network response was not ok: ${res.status} ${res.statusText} - ${text}`);
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log("PostData", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

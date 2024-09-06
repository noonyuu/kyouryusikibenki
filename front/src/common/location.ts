export const getPrefecture = async (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      reject("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // console.log("緯度: ", latitude);
        // console.log("経度: ", longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          // 都道府県名を取得
          const prefecture = data.address.state || data.address.province;
          resolve(prefecture);
        } catch (error) {
          console.error("都道府県の取得に失敗しました: ", error);
          reject(error);
        }
      },
      (error) => {
        console.error("位置情報の取得に失敗しました: ", error);
        reject(error);
      },
    );
  });
};

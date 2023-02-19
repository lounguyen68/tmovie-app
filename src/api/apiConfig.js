const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "f87e948c4c50f6340db101f0f764b452",
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

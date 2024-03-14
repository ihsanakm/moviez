const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '70406675ce01f92a5be813213940cfa0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
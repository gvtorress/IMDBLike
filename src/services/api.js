import axios from 'axios'

// URL Filmes em cartaz:
// https://api.themoviedb.org/3/movie/now_playing?api_key=d209a96000ba6e44748b2bc24376c93d

export const key = 'd209a96000ba6e44748b2bc24376c93d'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api

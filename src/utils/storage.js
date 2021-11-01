import AsyncStorage from '@react-native-async-storage/async-storage'

// Buscar os filmes salvos
export async function getMovieSave(key) {
    const myMovies = await AsyncStorage.getItem(key)

    let movieSave = JSON.parse(myMovies) || []

    return movieSave
}

// Salvar um novo filme
export async function saveMovie(key, newMovie) {
    let movieStored = await getMovieSave(key)

    const hasMovie = movieStored.some(item => item.id === newMovie.id)

    if (hasMovie) {
        return
    }

    movieStored.push(newMovie)

    await AsyncStorage.setItem(key, JSON.stringify(movieStored))
}

// Deletar algum filme específico
export async function deleteMovie(id) {
    let movieStored = await getMovieSave('@primereact')

    let myMovies = movieStored.filter(item => {
        return item.id !== id
    })

    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies))

    return myMovies
}

// Filtrar algum filme se já está salvo
export async function hasMovie(movie) {
    let movieStored = await getMovieSave('@primereact')

    const hasMovie = movieStored.find(item => item.id === movie.id)

    if (hasMovie) {
        return true
    }

    return false
}

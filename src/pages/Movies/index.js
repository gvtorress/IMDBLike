import React, { useEffect, useState } from 'react'

import { Container, ListMovies } from './styles'

import Header from '../../components/Header'
import FavoriteItem from '../../components/FavoriteItem'

import { getMovieSave, deleteMovie } from '../../utils/storage'

import { useNavigation, useIsFocused } from '@react-navigation/native'

function Movies() {
    const [movies, setMovies] = useState([])

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(() => {
        let isActive = true

        async function getFavoritMovies() {
            const result = await getMovieSave('@primereact')

            if (isActive) {
                setMovies(result)
            }
        }

        if (isActive) {
            getFavoritMovies()
        }

        return () => {
            isActive = false
        }
    }, [isFocused])

    async function handleDelete(item) {
        const result = await deleteMovie(item.id)
        setMovies(result)
    }

    function handleDetails(item) {
        navigation.navigate('Details', { id: item.id })
    }

    return (
        <Container>
            <Header title="MeusFilmes" />

            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <FavoriteItem
                        data={item}
                        deleteButton={() => handleDelete(item)}
                        detailsNavigation={() => handleDetails(item)}
                    />
                )}
            />
        </Container>
    )
}

export default Movies

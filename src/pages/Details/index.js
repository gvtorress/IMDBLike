import React, { useState, useEffect } from 'react'

import { ScrollView, Modal } from 'react-native'

import {
    Container,
    Header,
    HeaderButton,
    Banner,
    ButtonLink,
    Title,
    ContentArea,
    Rate,
    ListGenres,
    Description
} from './styles'

import { Feather, Ionicons } from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native'

import Genres from '../../components/Genres'
import ModalLink from '../../components/ModalLink'

import api, { key } from '../../services/api'

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage'

import Stars from 'react-native-stars'

function Details() {
    const navigation = useNavigation()
    const route = useRoute()

    const [movie, setMovie] = useState({})
    const [openLink, setOpenLink] = useState(false)
    const [favoritedMovie, setFavoritedMovie] = useState(false)

    useEffect(() => {
        let isActive = true

        async function getMovie() {
            const response = await api
                .get(`/movie/${route.params?.id}`, {
                    params: {
                        api_key: key,
                        language: 'pt-BR'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            if (isActive) {
                setMovie(response.data)
                const isFavorite = await hasMovie(response.data)
                setFavoritedMovie(isFavorite)
            }
        }

        if (isActive) {
            getMovie()
        }

        return () => {
            isActive = false
        }
    }, [])

    async function handleFavoriteMovie(movie) {
        if (favoritedMovie) {
            await deleteMovie(movie.id)
            setFavoritedMovie(false)
        } else {
            await saveMovie('@primereact', movie)
            setFavoritedMovie(true)
        }
    }

    return (
        <Container>
            <Header>
                <HeaderButton
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={28} color="#FFF" />
                </HeaderButton>
                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    {favoritedMovie ? (
                        <Ionicons name="bookmark" size={26} color="#FFF" />
                    ) : (
                        <Ionicons
                            name="bookmark-outline"
                            size={26}
                            color="#FFF"
                        />
                    )}
                </HeaderButton>
            </Header>
            <Banner
                resizeMethod="resize"
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                }}
            />

            <ButtonLink onPress={() => setOpenLink(true)}>
                <Feather name="link" size={24} color="#FFF" />
            </ButtonLink>

            <Title numberOfLines={1}>{movie.title}</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={
                        <Ionicons name="md-star" size={24} color="#E7A74E" />
                    }
                    emptyStar={
                        <Ionicons
                            name="md-star-outline"
                            size={24}
                            color="#E7A74E"
                        />
                    }
                    halfStar={
                        <Ionicons
                            name="md-star-half"
                            size={24}
                            color="#E7A74E"
                        />
                    }
                    disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>
            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Genres data={item} />}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descri????o</Title>
                <Description>{movie.overview}</Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    )
}

export default Details

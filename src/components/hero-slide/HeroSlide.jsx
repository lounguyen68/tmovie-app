import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, OutlineButton } from '../button/Button';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, {
                    params,
                });
                setMovieItems(response.results.slice(5, 9));
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{delay: 3000}}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={item}
                                className={`${isActive ? 'active' : ''}`}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const HeroSlideItem = (props) => {
    let navigate = useNavigate(props);

    const item = props.item;

    const backgroud = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.posters_path,
    );

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${backgroud})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate(`/movie/${item.id}`)}>
                            Watch now
                        </Button>
                        <OutlineButton
                            onClick={() => navigate(`/movie/${item.id}`)}
                        >
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img
                        src={apiConfig.w500Image(item.poster_path)}
                        alt="poster"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
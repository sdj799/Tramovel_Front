import { useEffect, useState } from "react";
import GooMap from "../../../google/GooMap";
import Star from "../component/Star";
import styled from "styled-components";
import { Button } from "@mui/base";

const DetailMovieWrapper = styled.div`
  position: relative;
  width: 70%;
  height: auto;
  margin: auto;
  padding: 7%;

  .movie {
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
    height: 700px;
    margin-bottom: 100px;
    
    img {
      height: inherit;
      margin: auto 0;
    }
  } 
`;

const Description = styled.div`
    background-color: rgba( 255, 255, 255, 0.1 );
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  
    >div{
        margin-top: 18px;
    }
    .title {
        margin: 0;
        font-size: 55px;
    }
    .genres { 
        display: flex;
        font-size: 14px;
        
        .genre {
            color: white;
            padding: 5px;
            margin-right: 7px;
            background-color: #7b8ce0;
            border-radius: 20px;
            &:last-child{
              margin-right: 0;
            }
        }
    }
    
    .sub-info{
        font-size: 16px;
        display: flex;
        word-break: keep-all;
        
        >div::after{
            content: "";
            padding: 7px;
          }
        }

        h1.title {
          word-break: keep-all;
        }

        .release-date{
            overflow: nowrap;
        }
        .vote-average {
            display: flex;
            >div{
                margin-left:5px;
            }
        }
    }

    .overviewInfo {
        .tagline{
            font-size: 25px;
            margin-bottom: 3px;
        }
        .overview{
            font-size: 20px;
            font-weight: 300;
            word-break: keep-all;
        }
    }

    .companies {
        font-size: 17px;
        .company {
            margin-bottom: 15px;
            img {
                object-fit: contain;
                max-width:120px;
                max-height:50px;
            }
        }
    }
`;
export default function DetailMovie({ movieInfo, imageUrl }) {
  const { poster_path, title, genres, imdb_id, release_date, vote_average, tagline, overview } = movieInfo;
  const [locations, setLocations] = useState([]);
  const [gooLocation, setGooLocation] = useState('');

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {

    const url = 'https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=' + imdb_id;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result && result.locations) {
        // Extracting the location strings from the result and setting it to the 'locations' state.
        const locationNames = result.locations.map((location) => location.location);
        setLocations(locationNames);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const searchLocation = (e) => {
    setGooLocation(e.target.textContent);
  }

  return (
    <DetailMovieWrapper>
      <div className="movie">
        <img className="rounded" src={imageUrl + poster_path} />
        <Description>
          <h1 className="title">{title}</h1>
          <div className="genres">
            {genres.map(genre =>
              <div className="genre" key={genre.id}>{genre.name}</div>)}</div>
          <div className="sub-info">
            <div className="release-date">개봉일 : {release_date}</div>
          </div>
          <div className="vote-average">
            <Star vote_average={vote_average} />
            <div>{vote_average}</div>
          </div>
          <div className="overviewInfo">
            <div className="tagline">{tagline ? `"${tagline}"` : ''}</div>
            <div className="overview">{overview}</div>
          </div>
        </Description>
      </div>
      <GooMap location={gooLocation} />
      {
        locations.map((location, index) => (
          <Button key={index} onClick={searchLocation}>{location}</Button>
        ))
      }
    </DetailMovieWrapper>
  )
}
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'
import { Link, useRouteMatch } from 'react-router-dom';
import { getArtists } from '../../api';

const ArtistsList = () => {
    const user = useContext(UserContext);
    //const { url, path  } = useRouteMatch();
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        console.log('ArtistsList');
        async function getData() {
            //let response = await saveArtist({
            //    Name: "Shawn",
            //    About: "Im new",
            //    BackgroundImageUrl: "url",
            //    AvatarImageUrl: "avurl",
            //});

            let response = await getArtists();
            console.log('ArtistsList response', response);
            switch (response.status) {
                case "success":
                    setArtists(response.items);
                    break;
                case "warn":
                    console.warn(response.message);
                    break;
                case "error":
                    console.error(response);
                    break;
                default:
                    break
            }
            
        }

        getData();
    }, []);

    return (
        <div>
            <h1>Artists</h1>
            <div><Link to="/artists/join">Join</Link></div>
            <ul>
            {artists.map((a) => {
                return (
                    <li key={ a.id }>
                        {a.name} <Link to={`/artist/${a.id}`}>View</Link>
                    </li>
                    );
            })}
                </ul>
        </div>);
};

export default ArtistsList;
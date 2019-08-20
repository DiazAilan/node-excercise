import {getPhotos} from './photos/photos';
import {getAlbums} from './albums/albums';
import {glossary} from './glossary';
import usersRouter from './users/users.router';
import albumsRouter from './albums/albums.router';
import {AlbumRegistration} from "./albums/albums.models";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/albums', albumsRouter);
app.get('/photos', (_, res) => getPhotos().then(photosData => res.json(photosData)));
app.get('/', (_, res) => res.json(glossary));

export let database = {
    albumRegister: null,
};

getAlbums().then(albumsData => {
    database.albumRegister = albumsData.map(album => {
        return new AlbumRegistration(album);
    })
});


app.listen(3000, () => console.log('Server ready'));
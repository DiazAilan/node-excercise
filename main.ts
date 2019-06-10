import {getUsers, getUserAlbums, getUserPhotos} from './users/users';
import {getPhotos} from './photos/photos';
import {getAlbums} from './albums/albums';
import {glossary} from './glossary';

const express = require('express');
const app = express();

app.listen(3000, () => console.log('Server ready'));

app.get('/users', (_, res) => getUsers().then(usersData => res.send(usersData)));
app.get(
    '/users/:id/albums',    
    (req, res) => getUserAlbums(req.params.id).then(albumData => res.send(albumData))
);
app.get(
    '/users/:id/albums/photos',
    (req, res) => getUserPhotos(req.params.id).then(albumData => res.send(albumData))
);
app.get('/photos', (_, res) => getPhotos().then(photosData => res.send(photosData)));
app.get('/albums', (_, res) => getAlbums().then(albumsData => res.send(albumsData)));

app.post(
    '/albums/:id/share',
    (req, res) => => shareAlbum().then(permits => res.send(permits));
)

app.get('/', (_, res) => res.send(glossary));

// app.use('/users', () => getUsers().then(usersData => console.log(users = usersData)));
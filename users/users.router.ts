import {getUserAlbums, getUserPhotos, getUsers} from "./users";
import {database} from "../main";
import {editUserAlbumPermission, findAlbumInRegister} from "../albums/albums";

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => getUsers(req, database.albumRegister).then(usersData => res.json(usersData)));
router.get(
    '/:id/albums',
    (req, res) => getUserAlbums(req.params.id).then(albumsData => res.json(albumsData))
);
router.get(
    '/:id/albums/photos',
    (req, res) => getUserPhotos(req.params.id).then(photosData => res.json(photosData))
);
router.get(
    '/:id/photos',
    (req, res) => getUserPhotos(req.params.id).then(photosData => res.json(photosData))
);
router.put('/:userId/albums/:albumId/permissions', (req, res) => {
    const permission = {
        userId: req.params.userId,
        access: req.body.access,
    };
    editUserAlbumPermission(req.params.albumId, permission, database.albumRegister);
    return res.json(findAlbumInRegister(req.params.albumId, database.albumRegister));
});

export default router;
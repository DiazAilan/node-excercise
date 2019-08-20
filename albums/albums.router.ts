import {findAlbumInRegister, getAlbums, shareAlbum} from "./albums";
import {database} from "../main";

const express = require('express');
const router = express.Router();

router.get('/albums', (_, res) => getAlbums().then(albumsData => res.json(albumsData)));
router.get('/albums/register', (_, res) => res.json(database.albumRegister));
router.get('/albums/register/:id', (req, res) => res.json(findAlbumInRegister(req.params.id, database.albumRegister)));
router.post('/albums/register/:id', (req, res) => {
    shareAlbum(req.params.id, req.body.permission, database.albumRegister);
    return res.json(findAlbumInRegister(req.params.id, database.albumRegister));
});

export default router;
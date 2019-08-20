import { getResource } from '../utils/getResource';
import { getPhotosByAlbum } from '../photos/photos';
import { findAlbumInRegister} from "../albums/albums";
import {AlbumAccess, AlbumRegistration} from "../albums/albums.models";

export async function getUsers(req, albumCollection: AlbumRegistration[]) {
    console.log(req.query);
    if(req.query && req.query.access && req.query.albumId) {
        return findUsersWithAccessInAlbumRegistration(req.query.access, req.query.albumId, albumCollection)
    } else {
        return getResource('users');
    }
}

export function getUserAlbums(userId: string) {
    return getResource('albums', {
        userId: userId
    });
}

export async function getUserPhotos(userId: string) {
    let userAlbums = await getUserAlbums(userId);
    let userAlbumsIds = userAlbums.map(album => album.id);
    let userPhotos = [];

    for(let i = 0; i < userAlbumsIds.length; i++) {
        await getPhotosByAlbum(userAlbumsIds[i]).then(photos => userPhotos.push(photos));
    }
    
    return userPhotos;
}

export function findUsersWithAccessInAlbumRegistration(permissionType: AlbumAccess, albumId: number, albumCollection: AlbumRegistration[]) {
    const targetAlbum = findAlbumInRegister(albumId, albumCollection);
    const filteredPermissions = targetAlbum.permissions.filter(permission => permission.access === permissionType);
    return filteredPermissions.map(permission => permission.userId);
}
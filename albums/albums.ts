import { getResource } from '../utils/getResource';
import {AlbumPermission, AlbumRegistration} from "./albums.models";

export function getAlbums() {
    return getResource('albums');
}

export function shareAlbum(albumId: number, albumPermission: AlbumPermission, albumCollection: AlbumRegistration[]) {
    const targetAlbum = findAlbumInRegister(albumId, albumCollection);
    if(targetAlbum) {
        const targetPermission = _findPermissionInAlbumRegistration(albumPermission.userId, targetAlbum);
        console.log('TARGET PERMISSION IS');
        console.log(targetPermission);
        if(targetPermission) {
            throw new Error("You can't share an already shared album");
        } else {
            targetAlbum.permissions.push(albumPermission);
        }
    } else {
        throw new Error("You can't share an nonexistent album");
    }
}

export function editUserAlbumPermission(albumId: number, albumPermission: AlbumPermission, albumCollection: AlbumRegistration[]) {
    const targetAlbum = findAlbumInRegister(albumId, albumCollection);
    if(targetAlbum) {
        const targetPermission = _findPermissionInAlbumRegistration(albumPermission.userId, targetAlbum);
        if(targetPermission) {
            targetPermission.access = albumPermission.access;
        } else {
            throw new Error("You can't edit an nonexistent album permission")
        }
    } else {
        throw new Error("You can't edit the permissions of an nonexistent album");
    }
}

export function findAlbumInRegister(albumId: number, albumCollection: AlbumRegistration[]) {
    return albumCollection.find(album => album.id == albumId);
}

function _findPermissionInAlbumRegistration(userId: number, album: AlbumRegistration): AlbumPermission {
    return album.permissions.find(permission => permission.userId == userId);
}


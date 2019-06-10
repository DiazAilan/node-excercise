import { getResource } from '../utils/getResource';

export function getUsers() {
    return getResource('users');
}

export function getUserAlbums(userId: string) {
    return getResource('albums', {
        userId: userId
    });
}

export function getUserPhotos(userId: string) {
    const userAlbums = getUserAlbums(userId);
    const userAlbumsIds = userAlbums.map(album => album.id);
    return userAlbums;
}

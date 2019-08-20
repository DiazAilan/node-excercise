import { getResource } from '../utils/getResource';

export function getPhotos() {
    return getResource('photos');
}

export function getPhotosByAlbum(albumId: string) {
    return getResource('photos', {
        albumId: albumId
    });
}
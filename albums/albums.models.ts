class Album {
    id: number;
    title: string;
    userId: number;
}

export enum AlbumAccess {
    BLOCKED = 'BLOCKED',
    OWNER = 'OWNER',
    SHARED = 'SHARED',
}

export class AlbumRegistration {
    id: number;
    permissions: AlbumPermission[];

    constructor(album: Album) {
        this.id = album.id;
        this.permissions = [];
    }
}

export class AlbumPermission {
    userId: number;
    access: AlbumAccess;
}
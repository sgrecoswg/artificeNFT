import Dexie from 'dexie';

export function localDb() {
    const db = new Dexie("SensibleProgramming.ArtificeNFT");
    db.version(1).stores({
        dataVersion: '++id,guid',
        artists:'&id,name'
    });

    return {
        context: {},
        create: () => { localDb.context = db; },
        clear: () => { db.clear(); },
        destroy: () => { Dexie.delete('SensibleProgramming.ArtificeNFT'); },
        artists: {            
            get: async (id) => {
                if (id) {
                    let _found = await db.artists.get(id);
                    return _found;
                } else {
                    let _found = await db.artists().ToArray();
                    return _found;
                }
            },
            add: async (artist)=>{
                if (artist) {
                    return await db.artists.add(artist);
                } else {
                    throw new Error('No Artist passed to add.');
                }
            },
            bulkAdd: async (artists) => {
                if (artists) {
                    return await db.artists.bulkAdd(artists);
                } else {
                    throw new Error('No Artists passed to add.');
                }
            },
            update: async (artist) => {
                if (artist) {
                    return await db.artists.update(artist.id, {
                        name: artist.name
                    });
                } else {
                    throw new Error('No Artist passed to update.');
                }
            },
            delete: async (artistId) => {
                if (artistId && artistId > 0) {
                    return await db.artists.delete(artistId);
                } else {
                    throw new Error('No artistId passed to remove.');
                }
            }
        }
       
    }
}
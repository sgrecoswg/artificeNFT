import Dexie from 'dexie';

var db = new Dexie("sensible-programming-artist");

db.version(1).stores({
    artists: "&id",
    settings:"&name"
});

export const getSetting = async(name) => {
    return await db.settings.where("name").equals(name).first();
}

export const setSetting = async(name,value) => {
    return await db.settings.put({name,value});
}

export const resetSetting = async(settings) => {
    db.settings.clear();
    return await db.settings.bulkPut(settings);
}



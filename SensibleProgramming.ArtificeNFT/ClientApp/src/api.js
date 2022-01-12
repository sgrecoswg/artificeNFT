import { localDb } from './database';
//import {appInsights} from './AppInsights';
//import {SeverityLevel} from '@microsoft/applicationinsights-web';
let db = localDb();

const _baseUrl = process.env.REACT_APP_API_BASEURL;

/**
 * Basic fetch to an api url
 * @param {string} url
 */
const Get = async (url) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(_text);
            return _data;
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing the data', e);
        }
    }).catch((exc) => {
    /*
         appInsights.trackException({
            error:e,
            severityLevel:SeverityLevel.Error,
            properties:{method:`Get ${url}`,text:text}
         });
         */
        throw exc;
    });
}

/**
 * 
 * @param {string} url
 * @param {Object} data
 */
const Post = async (url,data) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        }),
        //credentials: "include"
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(_text);
            return _data;
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing the data', e);
        }
    }).catch((exc) => {
        /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
        throw exc;
    });
};

/**
 * 
 * @param {string} url
 * @param {Object} data
 */
const PostData = async (url, data) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url, {
        method: 'POST',       
        body: data,
       // credentials: "include"
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(_text);
            return _data;
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing the data', e);
        }
    }).catch((exc) => {
        /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
        throw exc;
    });
};

/**
 * 
 * @param {string} url
 * @param {Object} data
 */
const Put = async (url, data) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        }),
        //credentials: "include"
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(_text);
            return _data;
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing the data', e);
        }
    }).catch((exc) => {
        /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
        throw exc;
    });
};

/**
 * 
 * @param {string} url
 * @param {Object} data
 */
const Delete = async (url) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url, {
        method: 'DELETE'
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(_text);
            return _data;
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing the data', e);
        }
    }).catch((exc) => {
        /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
        throw exc;
    });
};

/**
 * Downloads a file
 * @param {string} url
 * @param {Object} data
 */
const Download = async (url, data) => {
    url = `${_baseUrl}/${url}`;
    return await fetch(url, {
        method: 'POST',
        header: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(data),
        credentials: "include"
    }).then(async (r) => r.blob())
      .then(async (blob) => {
        try {
            let _file = window.URL.createObjectURL(blob);
            window.location.assign(_file);
        } catch (e) {
            /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
            throw new Error('There was an error processing teh data', e);
        }
    }).catch((exc) => {
        /*
             appInsights.trackException({
                error:e,
                severityLevel:SeverityLevel.Error,
                properties:{method:`Get ${url}`,text:text}
             });
             */
        throw exc;
    });

   /**
    * Gets all the artists we have.
    * @returns Promise 
    * */
   
};

/**
 * Gets artist from local db first
 * */
export async function GetArtistsFromLocal() {
    let _cached = await db.artist.get();
    if (!_cached || _cached.length === 0) {
        let _results = await Get('artists');
        await db.artists.bulkAdd(_results);
        _cached = db.artists.get();
    }
    return _cached;
}

/**
 * Gets the artists
 */
export async function getArtists() {
    return await Get(`api/Artists`);
}

/**
 * Gets the artist by it's id
 * @param {any} id
 */
export async function getArtist(id) {
    return await Get(`api/Artists/Get/${id}`);
}

/**
 * Saves the artist to the db
 * @param {any} artist
 */
export async function saveArtist(artist) {   
    return await Post(`api/Artists`,artist);
}


/**
 * Saves the artist to the db
 * @param {any} artist
 */
export async function updateArtist(artist) {
    return await Post(`api/Artists/Update/${artist.Id}`, artist);
}

/**
 * Removes the artist to the db
 * @param {string} artistId
 */
export async function deleteArtist(artistId) {
    return await Delete(`api/Artists/${artistId}`);
}

/**
 * Uploads an avatar image to the server
 * @param {string} id The artists id
 * @param {FormData} formData
 */
export async function uploadAvatar(id, formData) {
    console.log('uploadAvatarToServer', id, formData);
    return await PostData(`api/DigitalAsset/Upload/${id}`, formData);
}


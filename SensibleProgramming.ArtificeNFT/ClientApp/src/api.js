import { localDb } from 'database'
//import {appInsights} from './AppInsights';
//import {SeverityLevel} from '@microsoft/applicationinsights-web';
let _db = localDb();

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
            const _data = JSON.parse(text);
            return _data;
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
        header: {"content-type":"application/json"},
        body: JSON.stringify(data),
        credentials: "include"
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(text);
            return _data;
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
        credentials: "include"
    }).then(async (r) => {
        let _text = await r.text();
        try {
            const _data = JSON.parse(text);
            return _data;
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
};



/**
 * 
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
    export async function GetArtists() {
        let _cached = await db.artist.get();
        if (!_cached || _cached.length === 0) {
            let _results = await Get('artists');
            await db.artists.bulkAdd(_results);
            _cached = db.artists.get();
        }
        return _cached;
    }
};

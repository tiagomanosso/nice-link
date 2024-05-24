import { URL } from "url";

export const urlUtil = {
    extract: (params) => {
        try {
            if (params.includes('minisite')) {
                // const username = params.split('&')[0].split('?')[1];
                // const store = params.split('=')[1];
                const username = params.split('&')[1].replace('=', '')
                const store = params.split('=')[1].split('&')[0];
                params = `/${username}/${store}`
            } else if (params.includes('?')) {
                const username = params.split('&')[0]
                const store = params.split('=')[1];
                params = `/${username.slice(2)}/${store}`
            } else if (params.includes('http')) {
                const url = new URL(params);
                const username = url.pathname;
                params = `${username}`
            }
            console.log("EXTRACTED: ", params)
            return params;
        } catch (error) {
            console.log("EXTRACTED ERRROR: ", params)
            return '/'
        }
    }
};
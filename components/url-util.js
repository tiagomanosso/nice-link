import { URL } from "url";

export const urlUtil = {
    extract: (params) => {
        try {
            console.log("params", params)
            if (params.includes('minisite')) {
                const username = params.split('&')[0].split('?')[1];
                const store = params.split('=')[1];
                params = `/${username}/${store}`
                
            } else if (params.includes('?')) {
                const username = params.split('&')[0]
                const store = params.split('=')[1];
                params = `/${username.slice(2)}/${store}`
            } else if (params.includes('http')) {
                const url = new URL(params);
                const username = url.pathname;
                const store = url.searchParams.get('store');
                params = `${username}`
            }
            return params;
        } catch (error) {
            return '/'
        }
    }
};
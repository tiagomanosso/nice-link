import { URL } from "url";

export const urlUtil = {
    extract: (params) => {
        try {
            console.log("params : ", params)
            if (params.includes('minisite')) {
                const i = params.split('&')
                const u = i[0].split('?')
                let store = i[1].split('=')[1];
                let username = '';
                if (i[0].includes('store')) {
                    const is = i[0].split('?')
                    store = is[1].split('=')[1];
                    i[1].includes('=') ? username = i[1].split('=')[0] : username = i[1]
                    params = `/${username}/${store}`
                } else {
                    if (u[1].includes('=')) {
                        username = u[1].replaceAll('=', '')
                        params = `/${username}/${store}`
                    } else {
                        username = params.split('&')[1]
                        if (username.includes('=')) {
                            console.log("SPLIT: ", username)
                        }
                        store = params.split('=')[1].split('&')[0];
                        params = `/${username}/${store}`
                    }
                }
            } else if (params.includes('?')) {
                if (params.includes('utm_campaign') || params.includes('utm_content') || params.includes('utm_source') || params.includes('utm_medium')) {
                    const p = params.split('?')
                    const username = p[0].split('/')[1];
                    const store = p[0].split('/')[2];
                    params = `/${username}/${store}`
                } else {
                    const username = params.split('&')[0]
                    const store = params.split('=')[1];
                    params = `/${username.slice(2)}/${store}`
                }
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
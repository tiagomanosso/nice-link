import { URL } from "url";

export const urlUtil = {
    extract: (params) => {
        try {
            console.log("params : ", params)
            if (params.includes('minisite')) {

                let username = '';
                let store = '';
                if (params.includes('fbclid')) {
                    params = params.split('?')[1]
                    if (params.split('&')[1].includes('=')) {
                        username = params.split('&')[1].slice(0, -1)
                    }

                    if (params.split('&')[2].includes('=')) {
                        store = params.split('&')[2].split('=')[1]
                    }
                    params = `/${username}/${store}`
                } else {
                    const i = params.split('&')
                    const u = i[0].split('?')
                    store = i[1].split('=')[1];

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
                }
            } else if (params.includes('?')) {
                if (params.includes('gclid') || params.includes('fbclid')) {
                    const p = params.slice(1).split('?')
                    const username = p[0].split('/')[0];
                    const store = p[0].split('/')[1];
                    params = `/${username}/${store}`
                } else if (params.includes('utm_campaign') || params.includes('utm_content') || params.includes('utm_source') || params.includes('utm_medium')) {
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
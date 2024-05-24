import { URL } from "url";

export const urlUtil = {
    extract: (params) => {
        try {
            if (params.includes('minisite')) {
                const i = params.split('&')
                console.log("i : ", i)
                const u = i[0].split('?')
                console.log("u : ", u)
                let store = i[1].split('=')[1];
                let username = '';
                if (i[0].includes('store')) {
                    const is = i[0].split('?')
                    store = is[1].split('=')[1];
                    console.log("SPLIT store: ", store)
                    i[1].includes('=') ? username = i[1].split('=')[0] : username = i[1]
                    console.log("SPLIT username: ", username)
                    params = `/${username}/${store}`
                } else {
                    if (u[1].includes('=')) {
                        username = u[1].replaceAll('=', '')
                        params = `/${username}/${store}`
                    } else {
                        // const username = params.split('&')[0].split('?')[1];
                        // const store = params.split('=')[1];
                        username = params.split('&')[1]
                        if (username.includes('=')) {
                            console.log("SPLIT: ", username)
                        }
                        store = params.split('=')[1].split('&')[0];
                        params = `/${username}/${store}`
                    }
                }
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

export const bioService = {
    getBio: async (params) => {
        try {
            if (!params || params === '/') return [];
            if (params.includes('minisite')) {
                const username = params.split('&')[0].split('?')[1];
                const store = params.split('=')[1];
                params = `/${username}/${store}`
            } else if (params.includes('?')) {
                const username = params.split('&')[0]
                const store = params.split('=')[1];
                params = `/${username.slice(2)}/${store}`
            }
            const response = await fetch(`https://parceirando.com.br/minisite${params}`, { next: { revalidate: 3600 }, cache: 'force-cache' }, {
                method: 'GET'
            })
            return await response.json();
        } catch (error) {
            return {}
        }
    }
};
import { urlUtil } from "./url-util";

export const bioService = {
    getBio: async (params) => {
        try {
            if (!params || params === '/' || params.includes('wp-content') || params.includes('robots.txt') || params.match(/\.(html?|php|aspx?|jsp|asp)$/i) || params.match(/\.(png|jpe?g|gif|webp)$/i)) return [];
            params = await urlUtil.extract(params);
            const response = await fetch(`https://parceirando.com.br/minisite${params}`, { next: { revalidate: 3600 }, cache: 'force-cache' }, {
                method: 'GET'
            })
            return await response.json();
        } catch (error) {
            return [];
        }
    }
};
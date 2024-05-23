
export const bioService = {
    getBio: async (params) => {
        try {
            const response = await fetch(`https://parceirando.com.br/minisite${params}`, { next: { revalidate: 3600 }, cache: 'force-cache' }, {
                method: 'GET'
            });

            if (!response.ok) {
                return []
            }
            return await response.json();
        } catch (error) {
            return []
        }
    }
};
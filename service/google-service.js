
const apiSecret = process.env.REACT_APP_GOOGLE_API_SECRET || 'gYYm5nB4R7eiUDNGqPiwKw';
const measurementId = process.env.REACT_APP_GOOGLE_MEASUREMENT_ID || 'G-C4JYBPG87K';

export const googleService = {
    send: async (params) => {

        try {
            const request = JSON.stringify(params);
            const response = await fetch(`https://www.google-analytics.com/mp/collect?api_secret=${apiSecret}&measurement_id=${measurementId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaton/json',
                },
                body: request
            })
            const r = await response.text();
            return r;
        } catch (error) {
            return '';
        }
    }
};
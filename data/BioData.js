
const bioData = await fetch('https://parceirando.com.br/minisite/acidblotter/642')
    .then(res => res.json())
    .then(data => {
        return data;
    })

export default bioData;




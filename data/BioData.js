// date: 1 Aug, 2022
// const bioData = [
//     {
//         name: 'Tiago',
//         username: 'acidblotter',
//         url: 'https://nxtlnk.vercel.app',
//         titleImg: true,
//         avatar: '/avatar.png',
//         nftAvatar: true,
//         description: 'Custom bio links for creatives who love coding. Made this first to use for my own weblinks vjy.me/lnk. ',
//         descShow: true,
//         subdesc: 'Use this template and deploy on vercel for free',
//         subdescShow: true,
//         newProductUrl: 'https://3dicons.co',
//         newProduct: true,
//         author: 'realvjy',
//         authorURL: 'https://twitter.com/realvjy',
//         footerText: 'made by'
//     },
// ];

const bioData = await fetch('https://parceirando.com.br/minisite/acidblotter/642')
    .then(res => res.json())
    .then(data => {
        return data;
    })

export default bioData;




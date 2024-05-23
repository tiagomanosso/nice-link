import styled from "styled-components";
import { Container } from "./ReusableStyles";
import { HexIcon, NewUp, OvalIcon } from './icons';

const Links = ({ bioData }) => {
  const name = bioData?.name || `Parceirando`;
  const url = bioData?.url || `https://parceirando.com.br`;
  const username = bioData?.username || `Parceirando`;
  const titleImg = false;
  const avatarImg = bioData?.profileImageUrl || `https://parceirando-minisite-images.s3.amazonaws.com/site/642/642.png`;
  const description = bioData?.bio || ``;
  const descShow = bioData?.bio || true;
  const subdesc = bioData?.subdesc || `Parceirando, Gestão de Afiliados`;
  const subdescShow = bioData?.subdescShow || false;
  const footerText = bioData?.footerText || `criado por`;
  const author = bioData?.author || `Parceirando`;
  const authorURL = bioData?.authorURL || `https://landing.parceirando.com.br`;
  const titleImage = bioData?.profileImageUrl;

  // Check what class to use oval or hex for avatar
  const avatarShape = bioData?.nftAvatar ? `nft-clipped` : `oval-clipped`

  let allLinks = [];
  const p = bioData?.products || [];
  const service = {}
  links(p, allLinks, service, bioData);

  extractDefaults(bioData, allLinks);

  // Description and subdescription goes here
  const descriptionText = descShow ? description : ``
  const subdescText = subdescShow ? subdesc : ``

  const newProduct = service || true; // checking for newProduct flag true false
  const newProductUrl = service.url || `https://landing.parceirando.com.br`; // get product url if available


  // Collect all links filter by type - social, project, nft and other etc=
  // get data for social section
  const social = allLinks.filter((el) => {
    return el.type === "social" && el.on
  });

  // Get data for install section
  const install = allLinks.filter((el) => {
    return el.type === "install" && el.on
  });

  // Get data for nfts
  const nfts = allLinks.filter((el) => {
    return el.type === "nft" && el.on
  });

  // Get data for other section
  const others = allLinks.filter((el) => {
    return el.type === "other" && el.on
  });

  // Get data for other section
  const banners = allLinks.filter((el) => {
    return el.type === "banner" && el.on
  });

  return (
    <LinkWrapper>
      <LinkContainer>
        <TopPart>
          <LinkHeader>
            <Avatar>
              <AvatarWrap>
                {/* Avatar svg  hex or oval if nftAvatar=true will convert to hex */}
                <HexIcon />
                <OvalIcon />
                <div className={`${avatarShape} avatar-border`}></div>
                <div className={`${avatarShape} avatar-fill`}></div>
                <img
                  src={avatarImg}
                  className={avatarShape}
                />
              </AvatarWrap>
            </Avatar>
            <Title>
              {/* Using titleimg flag to use image as title or text */}
              {titleImg ?
                <img src={titleImage} className="handle" /> :
                <h1>{name}</h1>
              }
              {/* if your remove username from data it will not appear */}
              {
                username ? <h3><a href={`${url}`}>{username}</a></h3> : ''
              }
            </Title>
          </LinkHeader>

          {/* Bio Section */}
          <LinkBio>
            {description && <h1>{descriptionText} </h1>}
            {subdesc && <h4>{subdescText}</h4>}
          </LinkBio>
          {/* End Bio Section */}

          {/* Weblinks started */}
          <WebLinkWrap>
            {/* Social Icon */}
            <LinkSection className="social">
              <div className="iconsonly">
                {
                  social.map((i) => {
                    return (
                      <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                        <LinkBox className="socialIcon">
                          <img src={i.icon} style={{ filter: 'var(--img)' }} />
                        </LinkBox>
                      </a>
                    )
                  })
                }
              </div>
            </LinkSection>
            {/* Social Icon */}

            {/* Other Section */}
            {
              others.length > 0 ?
                <LinkSection>
                  <h3>{bioData?.miniSiteTitle}</h3>
                  {/* bioData?.js > newProduct == true */}
                  {/* New Section will render once newProduct == true */}
                  {/* End bioData?.js, You can move this section anywhere */}
                  {
                    others.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <LinkBox>
                            <LinkTitle><img className="product-image" src={i.icon} /> {i.title}</LinkTitle> <NewUp />
                          </LinkBox>
                        </a>
                      )
                    })
                  }
                  {(newProduct) ? <NewSection>
                    <a href={newProductUrl} target="_blank" rel="noreferrer">
                      <img
                        src={service?.image}
                        className="newproduct"
                      />
                    </a>
                  </NewSection> : ''
                  }
                </LinkSection> : ''
            }

            {/* End Other Section */}
            {/* Install Section */}
            {
              install.length > 0 ?
                <LinkSection>
                  <h3>Instalar</h3>
                  {
                    install.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <LinkBox>
                            <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle> <NewUp />
                          </LinkBox>
                        </a>
                      )
                    })
                  }
                </LinkSection> : ''
            }
            {/* End Install Section */}

            {/* Extras Section */}
            {
              nfts.length > 0 ?
                <LinkSection>
                  <h3>Extras</h3>
                  {
                    nfts.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <LinkBox>
                            <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle> <NewUp />
                          </LinkBox>
                        </a>
                      )
                    })
                  }
                </LinkSection>
                : ''
            }
            {/* End NFT Section */}

            {/* Banner Section */}
            {
              banners.length > 0 ?
                <LinkSection>
                  {
                    banners.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <img
                            src={banners[0]?.image}
                            className="banner-img"
                          />
                        </a>
                      )
                    })
                  }
                </LinkSection>
                : ''
            }
            {/* End NFT Section */}
          </WebLinkWrap>
          {/* End Weblinks */}
        </TopPart>
        <BottomPart>
          <LinkFoot>
            <h4>{footerText} <a href={authorURL}>{author}</a></h4>
          </LinkFoot>
        </BottomPart>

      </LinkContainer>
    </LinkWrapper>

  )
};

export default Links;

const LinkWrapper = styled(Container)`
`
const LinkContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 24px;
`

const LinkHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 12px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       margin-top: 20px;
    }
`

const Avatar = styled.div`
    height: 90px;
    width: 90px;
    position: relative;
    margin-bottom: 12px;
`

const AvatarWrap = styled.div`
   height: 100%;
   width: 100%;
   filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
   img{
    height: calc(100% - 6px);
    width: calc(100% - 6px);
   }
   .avatar-border{
        height: 100%;
        width: 100%;
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
   .avatar-fill{
        height: calc(100% - 6px);
        width: calc(100% - 6px);
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
`
//background: linear-gradient(90deg, #4AB1F1 5.71%, #566CEC 33.77%, #D749AF 61.82%, #FF7C51 91.21%);
const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      font-size: 38px;
      font-weight: 700;
      
      letter-spacing: -2px;
      background: ${({ theme }) => theme.text.titleLinear};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 32px;
      }
    }
    h3{
      margin-top:6px;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -.7px;
      color: ${({ theme }) => theme.text.secondary};
      opacity: .5;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 15px;
        margin-top:2px;
      }
    }
    
 
    .name{
      margin-top: 8px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        width: 140px;
      }
    }
    .handle{
      height: 32px;
      margin-top: 6px;
      margin-bottom: 6px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        height: 26px;
      }
    }
`

const LinkBio = styled.div`
    display: flex;
    flex-direction: column;
    h1{
      font-size: 22px;
      line-height: 30px;
      font-weight: 500;
      letter-spacing: -0.6px;
      padding: 0 20px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 18px;
        line-height: 26px;
        padding: 0 8px;

      }
      vertical-align: middle;
      span{
        font-size: 12px;
        vertical-align: bottom;
        line-height: 30px;
        color: ${({ theme }) => theme.text.secondary};
        margin: 0 2px;
        @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
          font-size: 10px;
          line-height: 20px;
        }
      }
    }
    h4{
      font-size: 18px;
      letter-spacing: -.5px;
      margin: 10px 0;
      color: ${({ theme }) => theme.text.secondary};
      font-weight: 500;
        @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
          font-size: 15px;
          padding: 0 20px;
          line-height: 24px;
        }
      a{
         font-weight: 700;
         opacity: .7;
         &:hover{
          opacity: 1;
         }
      }
    }

`

const TopPart = styled.div`
    
`



const BottomPart = styled.div`
    margin-bottom: 40px;
    
`
const LinkFoot = styled.div`
    h4{
      color: ${({ theme }) => theme.text.secondary};
      line-height: 32px;
      letter-spacing: -.2px;
      font-size: 16px;
      font-weight: 500;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 12px;
      }
      span{
        font-size: 10px;
        vertical-align: bottom;
        line-height: 32px;
        margin: 0 2px;
        opacity: .6;
        @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
          font-size: 8px;
        }
      }
    }
`

const WebLinkWrap = styled.div`
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       padding: 0 12px;
    }
`


const LinkSection = styled.div`
    padding: 12px 0;
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    flex-direction: column;
    &.social{
      max-width: max-content;
      padding: 0;
      margin-bottom: 18px;
    }
    .iconsonly{
      display: flex;
      justify-content: center;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        flex-wrap: wrap;
      }
    }
    h3{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 4px;
      color: ${({ theme }) => theme.text.secondary};
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 11px;
      }
    }
`

const LinkBox = styled.div`
    padding: 15px 15px;
    border-radius: 12px;
    margin: 8px 18px;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -.5px;
    position: relative;
    text-align: center;
    
    &::before{
      content: "";
      border-radius: 12px;
      display: block;
      position: absolute;
      z-index: -1;
      inset: -2px;
      opacity: 0;
      transform: scale(0.8);
    }
    &:hover{
    transition: all 333ms ease 0s;
    border-color: transparent;
      &::before{
        opacity: 1;
        background: ${({ theme }) => theme.bg.hover};
        transition: all 333ms ease 0s;
        transform: scale(1);
      }
    }
    .new-up{
      transform: scale(.8);
      opacity: .7;
    }
    
    &.socialIcon{
      padding: 16px;
      border-radius: 50%;
      border: none;
      margin: 4px;
      background: ${({ theme }) => theme.bg.backgroundIcon};
      img{
        height: 24px;
      }
     
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        padding: 10px;
        margin: 2px;
        img{
          height: 20px;
        }
      }
    }
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      padding: 12px 16px;
      font-size: 16px;
    }
`
const LinkTitle = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 14px;
    }
    img{
      height: 20px;
      margin-right: 10px;
    }
`

const NewSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
    img{
      width: 100%;
      border: 1px solid ${({ theme }) => theme.bg.secondary};
      border-radius: 12px;
      cursor: pointer;
      &:hover{
       transform: scale(1.01);
      }
    }
`

function extractDefaults(bioData, allLinks) {
  if (bioData.length === 0) {
    bioData.bio = `O Parceirando é um Aplicativo que pode ser integrado ao seu Ecommerce em poucos cliques. Com ele você pode cooperar com Afiliados, Parceiros ou Influencers que tenham interesse em divulgar a sua loja e seus produtos em troca de comissões, tudo integrado com seu e-commerce, sem retenção de valores e sem sair do seu site.`;
    allLinks.push({
      title: `Instagram`,
      url: `https://www.instagram.com/parceirando`,
      type: 'social',
      icon: '/insta.svg',
      on: true
    });

    allLinks.push({
      title: 'Facebook',
      url: 'https://www.facebook.com/parceirando',
      type: 'social',
      icon: '/facebook.svg',
      on: true
    });

    allLinks.push({
      title: 'Youtube',
      url: 'https://www.youtube.com/@parceirando4158',
      type: 'social',
      icon: '/youtube.svg',
      on: true
    });

    allLinks.push({
      title: 'NuvemShop',
      url: 'https://www.nuvemshop.com.br/loja-aplicativos-nuvem/parceirando',
      type: 'install',
      icon: '/use.png',
      on: true
    });

    allLinks.push({
      title: 'Shopify',
      url: 'https://apps.shopify.com/parceirando',
      type: 'install',
      icon: '/use.png',
      on: true
    });

    allLinks.push({
      title: 'Cadastre-se como Afiliado.',
      url: 'https://parceirando.com.br/global/home#register',
      type: 'nft',
      icon: '/opensea.svg',
      on: true
    });

  }
}

function links(p, allLinks, service, bioData) {
  for (let i = 0; i < p.length; i++) {
    const l = p[i];

    if (l.type === "product") {

      const pr = {
        title: l.title,
        url: l.link,
        type: 'other',
        icon: l.image,
        on: l.enabled
      };

      allLinks.push(pr);
    }

    if (l.type === "service") {
      service.title = l.title;
      service.url = l.link;
      service.type = 'other';
      service.image = l.image;
      service.on = l.enabled;
    }
  }
  const twitter = bioData?.twitterUrl;
  if (twitter) {
    allLinks.push({
      title: 'Twitter',
      url: twitter,
      type: 'social',
      icon: '/twitter.svg',
      on: true
    });
  }
  const instagram = bioData?.instagramUrl;
  if (instagram) {
    allLinks.push({
      title: 'Instagram',
      url: instagram,
      type: 'social',
      icon: '/insta.svg',
      on: true
    });
  }
  const tiktok = bioData?.tiktokUrl;
  if (tiktok) {
    allLinks.push({
      title: 'TikTok',
      url: tiktok,
      type: 'social',
      icon: '/tiktok.svg',
      on: true
    });
  }

  const youtube = bioData?.youtubeUrl;

  if (youtube) {
    allLinks.push({
      title: 'Youtube',
      url: youtube,
      type: 'social',
      icon: '/youtube.svg',
      on: true
    });
  }


  const facebook = bioData?.facebookUrl;

  if (facebook) {
    allLinks.push({
      title: 'Facebook',
      url: facebook,
      type: 'social',
      icon: '/facebook.svg',
      on: true
    });
  }
  const whatsApp = bioData?.whatsApp;

  if (whatsApp && bioData?.showNumberMinisite) {
    allLinks.push({
      title: 'WhatsApp',
      url: whatsApp,
      type: 'social',
      icon: '/whatsapp.svg',
      on: true
    });
  }
}

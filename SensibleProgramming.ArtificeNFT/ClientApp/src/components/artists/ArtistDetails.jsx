import React, { useEffect, useState, useContext } from 'react';
import { useParams  } from 'react-router-dom';
import { UserContext } from '../../UserContext'

import { getArtist } from '../../api';

const ArtistDetails = () => {
    const user = useContext(UserContext);
    const { id } = useParams();
    const [artist, setArtist] = useState({});
    console.log('ArtistDetails', id);
    useEffect(() => {
        console.log('ArtistDetails');
        async function getData() {
            //let response = await saveArtist({
            //    Name: "Shawn",
            //    About: "Im new",
            //    BackgroundImageUrl: "url",
            //    AvatarImageUrl: "avurl",
            //});

            let response = await getArtist(id);//c203f9a0-ec82-4a31-bc02-883b96115368
            console.log('getArtist by id response', response);
            switch (response.status) {
                case "success":
                    response.items.backgroundImageUrl = 'https://www.pcclean.io/wp-content/gallery/aurora-hd-wallpapers/735823.jpg'
                    response.items.avatarImageUrl = 'https://lh3.googleusercontent.com/L1-sp2YZkIGYl_TuGa_tjMmxF1QEcmvjNjllBpaR0IFj2x4P8xEGaE-NSQQkzS4AgzwQQxWJ_bqRlZoa3LQjTIi_gF6fFodUn8D06Mg=s130';
                    setArtist(response.items);
                    break;
                case "warn":
                    console.warn(response.message);
                    break;
                case "error":
                    console.error(response);
                    break;
                default:
                    break
            }
        }

        getData();
    }, []);

    return (
        <div>
            
            <div className="artist-bg" style={{ height: '200px', width: '100%', backgroundImage: `url("${artist.backgroundImageUrl}")`}}>
                <div style={{ borderRadius: '50%', height: '100px', width: '100px', backgroundImage: `url("${artist.avatarImageUrl}")` }}></div>
                <div><h1>Artist {artist.name}</h1></div>
                <div></div>
            </div>
            
        </div>
    );
};

export default ArtistDetails;

/*
 <div class="CollectionHeaderreact__DivContainer-sc-1woywpk-0 leOEIG">
    <div class="Blockreact__Block-sc-1xf18x6-0 dBFmez CollectionHeader--banner-container">
        <div class="Bannerreact__DivContainer-sc-m8vf0o-0 dLltuv" style="height: 220px;">
            <div class="Banner--content">
            </div>
        </div>
     </div>
            
    <div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 hZGRPw jYqxGr">
        <div class="Blockreact__Block-sc-1xf18x6-0 dBFmez CollectionHeader--info">
            <button type="button" class="UnstyledButtonreact__UnstyledButton-sc-ty1bh0-0 btgkrL">
                <div class="Imagereact__DivContainer-sc-dy59cl-0 hezVSt Image--isImageLoaded Image--isImageLoaderVisible CollectionHeader--collection-image" style="height: 130px; width: 130px;">
                    <img alt="" class="Image--image" src="https://lh3.googleusercontent.com/L1-sp2YZkIGYl_TuGa_tjMmxF1QEcmvjNjllBpaR0IFj2x4P8xEGaE-NSQQkzS4AgzwQQxWJ_bqRlZoa3LQjTIi_gF6fFodUn8D06Mg=s130" style="object-fit: cover;">
                    </div>
                    </button>
                    </div>
                    
                    <div width="100%" class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 SpaceBetweenreact__SpaceBetween-sc-jjxyhg-0 lmazUR jYqxGr gJwgfT">
                        <div></div>
                        <div class="fresnel-container fresnel-greaterThanOrEqual-sm ">
                            <div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexEndreact__FlexEnd-sc-rss0by-0 dBFmez jYqxGr eEhtsU">
                                <div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 ButtonGroupreact__StyledButtonGroup-sc-1skvztv-1 dBFmez jYqxGr daKevg">
                                    <a class="styles__StyledLink-sc-l6elh8-0 ekTmzq Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 bhqEJb kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" href="https://ethstonks.finance/" rel="nofollow noopener" target="_blank">
                                        <div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jClwup jYqxGr">
                                    <div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 icons__DivContainer-sc-1dx2b3i-0 dBFmez jYqxGr eeUNRj"><svg class="" fill="#8A939B" viewBox="0 0 20 16" style="height: 20px; width: 20px;"><path d="M17.569.5H2.43C1.39.5.548 1.344.548 2.375l-.01 11.25A1.89 1.89 0 002.43 15.5H17.57a1.89 1.89 0 001.892-1.875V2.375A1.89 1.89 0 0017.57.5zm-4.73 13.125H2.43v-3.75h10.408v3.75zm0-4.688H2.43v-3.75h10.408v3.75zm4.73 4.688h-3.785V5.187h3.785v8.438z"></path></svg>
                                    </div>
                                    </div>
                                    </a>
                                    <a class="styles__StyledLink-sc-l6elh8-0 ekTmzq Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 bhqEJb kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" href="https://discord.gg/fjwV7xP4tZ" rel="nofollow noopener" target="_blank"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jClwup jYqxGr"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 icons__DivContainer-sc-1dx2b3i-0 dBFmez jYqxGr eeUNRj"><svg class="" fill="#8A939B" viewBox="0 0 22 16" style="height: 20px; width: 20px;"><path d="M8.11.5c-.28.002-2.574.067-4.996 1.873 0 0-2.584 4.665-2.584 10.408 0 0 1.507 2.593 5.473 2.719 0 0 .664-.792 1.202-1.477-2.278-.685-3.14-2.108-3.14-2.108s.18.126.502.307c.018 0 .035.019.07.036.055.035.108.054.162.09.448.252.896.45 1.31.611.736.307 1.615.576 2.639.774 1.346.252 2.925.342 4.646.019a12.954 12.954 0 002.603-.774 10.118 10.118 0 002.062-1.063s-.896 1.458-3.247 2.125c.538.666 1.185 1.439 1.185 1.439 3.965-.126 5.473-2.72 5.473-2.7 0-5.746-2.584-10.409-2.584-10.409C16.32.446 13.861.5 13.861.5l-.251.288c3.05.918 4.468 2.27 4.468 2.27a14.856 14.856 0 00-5.4-1.711 15.048 15.048 0 00-3.626.036c-.107 0-.197.019-.306.035-.628.072-2.153.288-4.073 1.135-.663.288-1.059.505-1.059.505S5.088 1.635 8.317.717L8.137.5h-.028zm-.457 6.645c1.022 0 1.849.882 1.83 1.981 0 1.1-.808 1.982-1.83 1.982-1.005 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981zm6.55 0c1.004 0 1.83.882 1.83 1.981 0 1.1-.809 1.982-1.83 1.982-1.006 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981z"></path></svg></div></div></a><a class="styles__StyledLink-sc-l6elh8-0 ekTmzq Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 bhqEJb kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" href="https://t.me/ethstonks" rel="nofollow noopener" target="_blank"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jClwup jYqxGr"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 icons__DivContainer-sc-1dx2b3i-0 dBFmez jYqxGr eeUNRj"><svg class="" fill="#8A939B" viewBox="0 0 24 16" style="height: 20px; width: 20px;"><path clip-rule="evenodd" d="M18.28 15.456c.317.168.725.21 1.09.107.363-.104.631-.337.712-.62.854-3.013 2.928-10.64 3.706-13.38.06-.207-.04-.421-.256-.56A1 1 0 0022.748.9C18.625 2.045 5.921 5.62.729 7.06c-.329.092-.543.33-.532.59.012.262.246.488.583.564 2.329.522 5.385 1.25 5.385 1.25s1.428 3.234 2.173 4.88c.093.206.309.369.593.425.283.055.586-.003.798-.153l3.046-2.157s3.513 1.933 5.506 2.997zM7.45 9.054L9.1 13.14l.367-2.587 10.02-6.778c.106-.072.12-.193.032-.278-.088-.085-.249-.104-.37-.047L7.45 9.054z" fill-rule="evenodd"></path></svg></div></div></a><a class="styles__StyledLink-sc-l6elh8-0 ekTmzq Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 bhqEJb kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" href="https://www.twitter.com/MrFwashere" rel="nofollow noopener" target="_blank"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jClwup jYqxGr"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 icons__DivContainer-sc-1dx2b3i-0 dBFmez jYqxGr eeUNRj"><svg class="" fill="#8A939B" viewBox="0 0 18 16" style="height: 20px; width: 20px;"><path d="M.09 13.791c1.992.14 3.728-.344 5.327-1.571-.816-.098-1.527-.311-2.127-.786-.584-.466-1.032-1.047-1.272-1.841h1.48c.008-.033.016-.066.024-.107-.816-.237-1.512-.663-2.032-1.342-.52-.67-.775-1.448-.8-2.3.52.148 1.016.295 1.52.434.016-.033.04-.065.056-.098-.72-.606-1.24-1.334-1.431-2.275a3.92 3.92 0 01.391-2.7c2 2.389 4.511 3.715 7.598 3.936-.096-.778-.104-1.498.16-2.202.912-2.463 3.983-3.249 5.894-1.481.216.196.4.229.632.147.632-.229 1.255-.474 1.903-.72-.248.81-.784 1.408-1.415 1.989.615-.164 1.231-.336 1.839-.5.024.025.048.041.072.066-.464.491-.912 1.007-1.415 1.449-.272.237-.36.458-.376.818-.144 4.01-1.752 7.25-5.175 9.289-3.487 2.07-7.077 1.947-10.612-.025-.064-.04-.12-.09-.24-.18z"></path></svg></div></div></a><button aria-label="Collection More" class="Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 bhqEJb kdWcfm ButtonGroupreact__StyledButton-sc-1skvztv-0 eztnHW" type="button" aria-expanded="false"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jClwup jYqxGr"><i value="more_vert" size="24" class="Iconreact__Icon-sc-1gugx8q-0 irnoQt material-icons">more_vert</i></div></button></div></div></div><div class="fresnel-container fresnel-lessThan-sm "></div></div><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 gctoET jYqxGr"><h2 class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 jDYDKs dgOUEe">StonkNFT<button type="button" class="UnstyledButtonreact__UnstyledButton-sc-ty1bh0-0 btgkrL"></button></h2></div><div class="Blockreact__Block-sc-1xf18x6-0 karjuF"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoContainerreact__InfoContainer-sc-15x3z7c-0 CollectionStatsBarreact__Container-sc-8gdi9o-0 dBFmez jYqxGr fprnFG hVHLeQ"><div class="Blockreact__Block-sc-1xf18x6-0 InfoItemreact__BlockContainer-sc-gubhmc-0 dBFmez iePaOU"><a href="/assets/stonknft" class="styles__StyledLink-sc-l6elh8-0 ekTmzq"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 dBFmez jYqxGr dLEHkN CollectionStatsBar--info CollectionStatsBar--bottom-bordered"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 dBFmez jYqxGr Info--icon"><span class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cTCvbS kscHgv"><div class="Overflowreact__OverflowContainer-sc-10mm0lu-0 gjwKJf">67</div></span></div><div font-size="14px" class="Blockreact__Block-sc-1xf18x6-0 cDIxzt">items</div></div></a></div><div class="Blockreact__Block-sc-1xf18x6-0 InfoItemreact__BlockContainer-sc-gubhmc-0 dBFmez iePaOU"><a href="/collection/stonknft?tab=activity" class="styles__StyledLink-sc-l6elh8-0 ekTmzq"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 dBFmez jYqxGr dLEHkN CollectionStatsBar--info CollectionStatsBar--bottom-bordered"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 dBFmez jYqxGr Info--icon"><span class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cTCvbS kscHgv"><div class="Overflowreact__OverflowContainer-sc-10mm0lu-0 gjwKJf">47</div></span></div><div font-size="14px" class="Blockreact__Block-sc-1xf18x6-0 cDIxzt">owners</div></div></a></div><div class="Blockreact__Block-sc-1xf18x6-0 InfoItemreact__BlockContainer-sc-gubhmc-0 dBFmez iePaOU"><a href="/collection/stonknft?search[sortAscending]=true&amp;search[sortBy]=PRICE&amp;search[toggles][0]=BUY_NOW" class="styles__StyledLink-sc-l6elh8-0 ekTmzq"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 dBFmez jYqxGr dLEHkN CollectionStatsBar--info"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 dBFmez jYqxGr Info--icon"><button type="button" class="UnstyledButtonreact__UnstyledButton-sc-ty1bh0-0 btgkrL"><div size="20" class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexColumnreact__FlexColumn-sc-1wwz3hp-0 VerticalAlignedreact__VerticalAligned-sc-b4hiel-0 CenterAlignedreact__CenterAligned-sc-cjf6mn-0 Avatarreact__AvatarContainer-sc-sbw25j-0 gpGbLv jYqxGr ksFzlZ iXcsEj cgnEmv dukFGY"><img class="Blockreact__Block-sc-1xf18x6-0 Avatarreact__ImgAvatar-sc-sbw25j-1 gpGbLv hzWBaN CollectionStatsBar--eth-icon" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="20"></div></button><span class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cTCvbS kscHgv"><div class="Overflowreact__OverflowContainer-sc-10mm0lu-0 gjwKJf">0.1</div></span></div><div font-size="14px" class="Blockreact__Block-sc-1xf18x6-0 cDIxzt">floor price</div></div></a></div><div class="Blockreact__Block-sc-1xf18x6-0 InfoItemreact__BlockContainer-sc-gubhmc-0 dBFmez iePaOU"><a href="/collection/stonknft?tab=activity" class="styles__StyledLink-sc-l6elh8-0 ekTmzq"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 dBFmez jYqxGr dLEHkN CollectionStatsBar--info"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 dBFmez jYqxGr Info--icon"><button type="button" class="UnstyledButtonreact__UnstyledButton-sc-ty1bh0-0 btgkrL"><div size="20" class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexColumnreact__FlexColumn-sc-1wwz3hp-0 VerticalAlignedreact__VerticalAligned-sc-b4hiel-0 CenterAlignedreact__CenterAligned-sc-cjf6mn-0 Avatarreact__AvatarContainer-sc-sbw25j-0 gpGbLv jYqxGr ksFzlZ iXcsEj cgnEmv dukFGY"><img class="Blockreact__Block-sc-1xf18x6-0 Avatarreact__ImgAvatar-sc-sbw25j-1 gpGbLv hzWBaN CollectionStatsBar--eth-icon" src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg" size="20">
                </div>
            </button>
            <span class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cTCvbS kscHgv">
                <div class="Overflowreact__OverflowContainer-sc-10mm0lu-0 gjwKJf">0.00</div>
            </span>
        </div>
        <div font-size="14px" class="Blockreact__Block-sc-1xf18x6-0 cDIxzt">volume traded</div>
        </div>
        </a>
                </div>
            </div>
        </div>
        <div class="CollectionHeader--description" style="max-height: 130px; word-break: break-word;">
            <span>nfts for eth stonks</span>
        </div>
    </div>
</div>
 */
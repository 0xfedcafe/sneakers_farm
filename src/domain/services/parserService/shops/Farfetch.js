import cheerio from 'cheerio'
import Shop from './Shop'

class Farfetch extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
  }

  async resolvePrices(href, modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url:'https://www.farfetch.com/'+href.href.substr(href.href.search('shopping'),href.href.length-href.href.search('shopping')),
        headers:{
          cookie: `ffcp=a.0.0_p.1.0_f.1.0; ub=; BIcookieID=cb857835-f0a1-426b-83e1-369c6e79705c; optimizelyEndUserId=cb857835-f0a1-426b-83e1-369c6e79705c; usr-gender=249; _gcl_aw=GCL.1592469660.Cj0KCQjwoaz3BRDnARIsAF1RfLc9djuzBU2fyZbahAjMOCZXC7XKvhRzBYoxeAaae00vVUM3iPpRfu8aAiEYEALw_wcB; _gcl_au=1.1.1671388895.1592469660; _abck=F2723235389177DFA9B2CC0E8B9D5510~0~YAAQvPMVAs8v6atyAQAAlaKWxgRnZumj1HrMJYohPwFEDqFolG0lLEh9P4naztLES365aQdUtjiXScw+eVkuwTHCwx6LRkiws8H9XQpUkJ+PcFH5gk2RModwTPohZnxzg+Q1TmCcoujyqs/qkOpMfVLT6pwgaf+CnzMm37LmDZX66kma81UqHGC3/mLem0H1Wve8UIFgTuHzWFmN2WNNK9QwjAe2dBFkz1Yf+EksJA6kOKwrOaOISEEx1uVlpDKlDGZaJAX3VMUNQZ2w81Sv6km5U1uE1q4IzBP3N11zoZie8wEEFl6QtKEiyp7R6lnImrXFpnqICz7Z~-1~-1~-1; ff_ab=0; checkoutType2=4; session#1=1wcfu5rtqm5p4z5ne40rcshj; ftr_ncd=6; _gac_UA-3819811-6=1.1592469662.Cj0KCQjwoaz3BRDnARIsAF1RfLc9djuzBU2fyZbahAjMOCZXC7XKvhRzBYoxeAaae00vVUM3iPpRfu8aAiEYEALw_wcB; __utmz=other; tmr_lvid=cc35656d3355130ecdd2e9772a00bab6; tmr_lvidTS=1592469662665; _cs_c=1; rskxRunCookie=0; rCookie=gj01k6yra19r4uuo2ngsokbkjbjy8; _ym_uid=1592469663222023778; _ym_d=1592469663; ken_gclid=Cj0KCQjwoaz3BRDnARIsAF1RfLc9djuzBU2fyZbahAjMOCZXC7XKvhRzBYoxeAaae00vVUM3iPpRfu8aAiEYEALw_wcB; _pin_unauth=dWlkPU1EYzJPV0UyTldFdFlUUXlOeTAwTjJZekxUaGpOV1V0WXpSaE1URXdaREUyTW1RMQ; _fbp=fb.1.1592469663513.2015716398; flocktory-uuid=ffb9cda8-69c8-43da-bfb7-678509c0a517-3; afUserId=734ca2de-0e84-4893-a324-ae0f412f3dea-p; ORA_FPC=id=fa108686-b4de-4c4e-aec5-f84351b2676f; WTPERSIST=; _qubitTracker=1592469664660.428826; ff_newsletter=1; qb_generic=:XLGlr+7:.farfetch.com; SSP_AB_PDP_Design_20171215=Test; SSP_AB_calculator_vs_sud=sud; tmr_reqNum=26; __gads=ID=64956054fe96a3dd:T=1592680474:S=ALNI_MZhroukF5vczleuYVjD8H4KJ4RUDA; bm_sz=40E69F3A8FEB736B9468C9C10D1D7D17~YAAQhfgUAjyoMeZyAQAAU6d4/AgM/Uk33Tg0rv11kojNSFe5TtXfY1AV4HpRy4hCD4vjeAw4zU1NUDrIGfQjl70H2m1vgNRKV9wAXax9LmdndGAxBticssqOX01EKW8eTe2kF3HOWJJQWu0x7c12WOHoBaCNFWGsP1K2QO7rdT/AeIskb+mJ9DJ8iIZ114a/wBg=; FF.Session=5ehkazt2ecjqqzkngjtkuvpt; FF.ApplicationCookie=Arg6EujFhac0QbcSLFVhq9eEplrWi4047QG8jNe5X_6RhMe84Fis0VHM1UcEghATsK02MF8SSTQnuDSTGxVy5IvVufleCSDTf5T_yRbXxx6qj7RFXTFwaRFW--WyzOMXncgjuFxuxW7GzS-R5P1VQF7onoFe7D7NDmfxXa9cP5py5tK4bgtaHABRw3l6Pv2oOQQbUg7JRZbCaKN0p47DNOGQMsmEtZnIOggLvKHu3ibk6Ixw4iCYhsAiLF3ohZ-6Yy5-AA; ABCheckout=; ABReturns=; _gid=GA1.2.1551441304.1593373667; _qst_s=4; _qst=%5B4%2C0%5D; _ym_visorc_25950521=w; _ym_isad=2; ABGeneral=145.0_155.0_473.0_1180.0_9453.1; _sp_ses.b865=*; ABProduct=2.1_3.1_5.1_7.0_10.1_19.0_22.0_23.0_24.0_26.0_34.0_40.0_86.0_88.0_93.1_111.0_200.1_302.0_303.1_881.0_888.0_931.0_997.1_998.0_999.1; _scid=e1f7f9fc-3262-4368-b0f2-915e40ccddc6; _sctr=1|1593291600000; ckm-ctx-sf=/; ABLanding=1003:0; _gat_UA-3819811-6=1; _gat_gtag_UA_134721340_46=1; ABListing=63.0_64.0_149.0_345.0_359.1_363.0_364.0_365.0_367.0_369.1_370.1_372.1_389.1_564.1_609.1_661.0_662.0_701.0_777.0_9393.2; ff_abs=15-0; _ga_CEF7PMN9HX=GS1.1.1593373666.5.1.1593374333.38; forterToken=ca8be086a17e45bb8f777842d2103ff7_1593374333737__UDF43_9ck; _ga=GA1.2.777187018.1592469660; _uetsid=5823d0c1-0ecd-c2fd-ae16-0b769a029bfe; _uetvid=f9fdd51a-6593-39f6-2541-2bd76445dd9b; _br_uid_2=uid%3D1701975526929%3Av%3D11.8%3Ats%3D1593373696225%3Ahc%3D8; lastRskxRun=1593374334798; _cs_id=de713b39-563e-a46d-ba28-649ede62f9fe.1592469662.6.1593374334.1593373667.1.1626633662830.Lax.0; _cs_s=15.1; _qsst_s=1593374335107; qb_session=14:1:90:EtG8=E:0:XL8eLQQ:0:0:0:0:.farfetch.com; _qPageNum_farfetch=13; _qsst=1593374335421; _sp_id.b865=2b4a715c-85f5-44db-8400-c9f2ce135ac8.1592469680.4.1593374336.1592591949.95081b7e-899b-4bb8-89b6-f3ea4020bc42; qb_permanent=1592469664660.428826:21:14:4:3:0::0:1:0:Be6yik:Be+PZ/:A::::95.67.52.197:kiev:7793:ukraine:UA:50.49:30.46:unknown:unknown:kyiv:12650:migrated|1593374335666:EoGc==D=CItC=Js&EtG8==E=CJAB=PJ:B:XL8guKy:XL8eLQQ:0:0:0::0:0:.farfetch.com:0; __cid=24f0d78a-bb25-464e-9106-7f9cdbe5f450-c1682e5f3ab38c5f31c62ecf`
        }
    })
    return {prices:this.distructJson(html, href),shop: href.shop}
  }

  distructJson(html, href){
    const prices= []
    try {
      const $ = cheerio.load(html)
      $('._d87cdc').find('._ea069e').each( (i,el)=>{
        const price = {
          size:this.StringTools.getNthNum($(el).find('[data-tstid="sizeDescription"]').text()),
          price:this.StringTools.getNthNum($(el).find('[data-tstid="sizePrice"]').text()),
          href:href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        }
        if(!isNaN(price.price))prices.push(price)
      })
    } catch (e) {
      console.log(e);
    }
    finally{
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: 'https://www.farfetch.com/ru/shopping/women/search/items.aspx?rnd=637282773004976018&q='+modelId
    })

    return this.distructLink(html)
  }

  async distructLink(html){
    console.log(html);
    const $ = cheerio.load(html)
    var url = ''
    $('._c29d78._d85b45').each((i,el)=>{
      if(i==0){
        console.log('hrere');
        url=$(el).find('a').attr('href');
      }
    })
  }

}

export default Farfetch

const puppeteer = require('puppeteer');
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const cheerio = require('cheerio');


module.exports =  getDetails = async(req,res,next) =>{
    try{
        const city = req.params.id
        const PAGE_URL = `${process.env.BASE_URL}${city}`;
    
       
            const browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.goto(PAGE_URL);
            const buttonConsentReject = await page.$('.VfPpkd-LgbsSe[aria-label="Reject all"]');
            await buttonConsentReject?.click();
            const html = await page.content();
            await browser.close();
       
    
            const hotelsList = [];
            const $ = cheerio.load(html);
     
            $('.uaTTDe').each((i, el) => {
                const titleElement = $(el).find('.QT7m7 > h2');
                const priceElement = $(el).find('.kixHKb span').first();
                const reviewsElement = $(el).find('.oz2bpb > span');
                const hotelStandingElement = $(el).find('.HlxIlc .UqrZme');
                const details = $(el).find('.PVOOXe').attr('href')
    
                const options = [];
                const pictureURLs = [];
                
                
                $(el).find('.HlxIlc .XX3dkb').each((i, element) => {
                    options.push($(element).find('span').last().text());
                 });
           
                $(el).find('.EyfHd .x7VXS').each((i, element) => {
                         pictureURLs.push($(element).attr('src'));
                                        
                });
                
                hotelsList.push({
                    title : titleElement.text(),
                    ratings : reviewsElement.text(),
                    amenities : options,
                    price : priceElement.text(),
                    pictures : pictureURLs.filter(item => item != undefined),
                    star : hotelStandingElement.text() ,
                    Url : baseUrl+details
                })
                
            }); 
    
        res.status(200).json({
            data : hotelsList
        })
    }
    catch(err){
        console.log(err)
    }
    
}

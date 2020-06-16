//this is a library for handling the browsing process.
const puppeteer = require('puppeteer');

async function scrapeSomething(url) {
  //open up a headless browser, page and then go the url that we passed in
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //get title from the movie page
  const [title] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[2]/div[2]/h1'
  );
  const textTitle = await title.getProperty('textContent');
  const nameTitle = await textTitle.jsonValue();

  //get imdb score
  const [score] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[1]/div[1]/div[1]/strong/span'
  );
  const textScore = await score.getProperty('textContent');
  const nameScore = await textScore.jsonValue();

  //get movie description
  const [description] = await page.$x(
    '//*[@id="title-overview-widget"]/div[2]/div[1]/div[1]'
  );
  const textDescription = await description.getProperty('textContent');
  const nameDescription = await textDescription.jsonValue();

  //get src of the first image under the movie title
  const [img] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[3]/div[1]/a/img'
  );
  const srcImg = await img.getProperty('src');
  const urlImg = await srcImg.jsonValue();

  console.log({ nameTitle, nameScore, nameDescription, urlImg });
  
  //close the browser
  browser.close();
  return { nameTitle, nameScore, nameDescription, urlImg };
}

scrapeSomething('https://www.imdb.com/title/tt0068646/?ref_=nv_sr_srsg_0');

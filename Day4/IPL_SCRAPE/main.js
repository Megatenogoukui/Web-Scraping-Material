const axios = require("axios");
const cheerio = require("cheerio");
const {extract_link} = require("./ExtractResultsLink.js")
const fs = require("fs")
const path = require("path")




const ipl_path = path.join(__dirname , "IPL")
dir_creater(ipl_path)
async function scrape_ipl() {
  try {
    const resonse = await axios.get(
      "https://www.espncricinfo.com/series/ipl-2020-21-1210595"
    );

    const html = resonse?.data;
    const $ = cheerio.load(html);
    extract_link($)
  } catch (error) {
    console.log("ERROR : ", error);
  }
}


async function dir_creater(file_path){

  if (fs.existsSync(file_path) == false){
    fs.mkdirSync(file_path)
  }

}

scrape_ipl();
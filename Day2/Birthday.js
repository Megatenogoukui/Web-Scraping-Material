const axios  = require("axios")
const cheerio =  require("cheerio")


async function cricketers_birthday(){
    try {
       const  response = await axios.get("https://www.espncricinfo.com/series/indian-premier-league-2024-1410320/mumbai-indians-vs-sunrisers-hyderabad-55th-match-1426293/full-scorecard")
       const html = response.data
       const $ = cheerio.load(html)
       const both_tables = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line.ds-mb-4")
    //    console.log($(both_tables).html())
    for (let i = 0; i < 2; i++) {
        const names = $(both_tables[i]).find(".ds-popper-wrapper.ds-inline");
    

        for (let j =0 ; j < names.length ; j++){
            const link = $(names[j]).find("a").attr("href")

            const full_link = `https://www.espncricinfo.com/${link}`
            const birthday = await find_birthday(full_link)
            console.log("Names : ",$(names[j]).text() , birthday)
        } 
       
       }
    } catch (error) {
        console.log(error)
    }
}

async function find_birthday(link){
    try {
       const  response = await axios.get(link)
       const html = response.data
       const $ = cheerio.load(html)
       const details = $(".ds-text-title-s.ds-font-bold.ds-text-typo>p")
       return $(details[1]).text()
    
    } catch (error) {
        console.log(error)
    }
}

cricketers_birthday()
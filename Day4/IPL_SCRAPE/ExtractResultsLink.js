const {get_all_matches_link} = require("./GetAllMatchesLink.js")

async function extract_link($){
    //Finding the scorecard page link
    const scorecard_page = $(
       ".ds-border-t.ds-border-line.ds-text-center.ds-py-2"
     ).html();
     const scorecard_page_link = $(scorecard_page).attr("href");
     const scorecard_page_full_link = `https://www.espncricinfo.com/${scorecard_page_link}`;
     console.log(scorecard_page_full_link)

     await get_all_matches_link(scorecard_page_full_link)
}


module.exports = {extract_link : extract_link}
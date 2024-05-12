const axios = require("axios");
const cheerio = require("cheerio");
const { scorecard_detail } = require("./Scorecard");


async function get_all_matches_link(scorecard_page_full_link){
    const resonse = await axios.get(
        scorecard_page_full_link
      );
  
      const html = resonse?.data;
      const $ = cheerio.load(html);
      const scriptTags = $('.ds-p-4.hover\\:ds-bg-ui-fill-translucent.ds-border-t.ds-border-line script[type="application/ld+json"]');
      const promises = [];
        let count = 1
      scriptTags.each((index, element) => {
          const jsonData = JSON.parse($(element).html());
          const url = jsonData.broadcastOfEvent.url;
          const scorecard_url = url.replace("live-cricket-score" , "full-scorecard")

 promises.push(scorecard_detail(scorecard_url, count));
          count++
      });

      await Promise.all(promises);
}


module.exports = {get_all_matches_link: get_all_matches_link}
const axios = require("axios");
const cheerio = require("cheerio");

async function fetchDataforlastBallCommentary() {
  try {
    const response = await axios.get(
      "https://www.espncricinfo.com/series/indian-premier-league-2024-1410320/lucknow-super-giants-vs-kolkata-knight-riders-54th-match-1426292/ball-by-ball-commentary"
    );
    const html = response.data;
    const parse_tool = cheerio.load(html);
    const commentry = parse_tool(
      ".first-letter\\:ds-capitalize > .ci-html-content"
    );
    console.log("last_commentary: ", parse_tool(commentry[0]).text());
  } catch (error) {
    console.log(error);
  }
}

async function fetchDataforhighestwickettaker() {
  try {
    const response = await axios.get(
      "https://www.espncricinfo.com/series/indian-premier-league-2024-1410320/lucknow-super-giants-vs-kolkata-knight-riders-54th-match-1426292/full-scorecard"
    );
    const html = response.data;
    const parse_tool = cheerio.load(html);
    const commentry = parse_tool(
      ".ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo.ds-opacity-50.ds-mb-1 a"
    );
    const losing_team = parse_tool(commentry).text();

    const team_table_array = parse_tool(".ds-rounded-lg.ds-mt-2");
    let hight_wicket_taker = "";
    let hight_wicket = 0;
    for (let i = 0; i < team_table_array.length; i++) {
      // console.log(parse_tool(team_table_array[i]).html())

      const team_name = parse_tool(team_table_array[i]).find(
        ".ds-text-title-xs.ds-font-bold.ds-capitalize"
      );
      if (team_name.text() == losing_team) {
        const balling_table = parse_tool(team_table_array[i]).find(
          ".ds-p-0 .ds-w-full.ds-table.ds-table-md.ds-table-auto:eq(1)"
        );
        // console.log(balling_table.html())

        const bowling_table_row = parse_tool(balling_table).find("tr");
        for (let j = 0; j < bowling_table_row.length; j++) {
          const bowlername_row = parse_tool(bowling_table_row[j]).html();
          const bowlernametd = parse_tool(bowlername_row).find(
            ".ds-font-medium.ds-text-typo.ds-underline.ds-decoration-ui-stroke.hover\\:ds-text-typo-primary.hover\\:ds-decoration-ui-stroke-primary.ds-block.ds-cursor-pointer"
          );
          const bowlerwickettd = parse_tool(bowlername_row).find(
            ".ds-flex.ds-items-center.ds-cursor-pointer.ds-justify-end.ds-relative.ds-text-typo.ds-left-\\[15px\\]"
          );
          const bowler_name = bowlernametd.text();
          const wicket = parseInt(bowlerwickettd.text());
          if (wicket > hight_wicket) {
            hight_wicket = wicket;
            hight_wicket_taker = bowler_name;
          }
        }
      }
    }

    console.log("Highest Wicket Taker : ", hight_wicket_taker);
    console.log("Highest Wicket : ", hight_wicket);
  } catch (error) {
    console.log(error);
  }
}

fetchDataforlastBallCommentary();

fetchDataforhighestwickettaker();

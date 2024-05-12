const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

async function scorecard_details(scorecard_url, count) {
  try {
    const resonse = await axios.get(scorecard_url);

    const html = resonse?.data;
    const $ = cheerio.load(html);

    const data = $(".ds-text-tight-m.ds-font-regular.ds-text-typo-mid3").text();
    const result_data = $(
      ".ds-text-tight-s.ds-font-medium.ds-truncate.ds-text-typo"
    );
    const data_array = data.split(",");

    const venue = data_array[1].trim();
    const date = data_array[2] + data_array[3];
    const result = $(result_data).text();

    const both_teams_array_html = $(
      ".ds-text-tight-l.ds-font-bold.ds-text-typo.hover\\:ds-text-typo-primary.ds-block.ds-truncate"
    );
    let both_teams_array = [];
    both_teams_array_html.each((index, elem) => {
      both_teams_array.push($(elem).text());
    });
    console.log(both_teams_array);

    console.log("");
    console.log("");
    console.log("MATCH :", count);
    console.log(`${venue} | ${date} | ${result} `);

    const score_data = $(
      ".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line.ds-mb-4"
    );
    for (let i = 0; i < 2; i++) {
      const team1 = score_data[i];
      const team_name = $(team1)
        .find(".ds-text-title-xs.ds-font-bold.ds-capitalize")
        .text();
      const opponent_team_name = opponent_team(both_teams_array, team_name);
      const row = $(team1).find("tr");

      const req_row = $(row).filter((index, elem) => {
        return (
          ($(elem).attr("class") === undefined ||
            $(elem).attr("class") === "") &&
          $(elem).find("td").length === 8
        );
      });

      console.log("");
      console.log(`${team_name}`);

      req_row.each((index, elem) => {
        const column = $(elem).find("td");

        //player name
        let player_name = $(column[0]).text();
        player_name = player_name.replace("(c)", "").trim();
        player_name = player_name.replace("†", "").trim();

        //Runs
        let runs = $(column[2]).text();

        //Balls
        let balls = $(column[3]).text();

        //Fours
        let Fours = $(column[5]).text();

        //Sixes
        let Six = $(column[6]).text();

        //S/R
        let SR = $(column[7]).text();

        //  console.log(`${player_name}  ${runs}  ${balls}  ${Fours}  ${Six}  ${SR}` )

        process_players(
          player_name,
          runs,
          balls,
          Fours,
          Six,
          SR,
          team_name,
          venue,
          date,
          result,
          opponent_team_name
        );
      });
    }
  } catch (error) {
    console.log("ERROR : ", error);
  }
}

function process_players(
  player_name,
  runs,
  balls,
  Fours,
  Six,
  SR,
  team_name,
  venue,
  date,
  result,
  opponent_team_name
) {
  let team_path = path.join(__dirname, "IPL", team_name);
  dir_creater(team_path);
  let file_path = path.join(team_path, player_name + ".xlsx");
  let content = excel_reader(file_path, player_name);

  let player_object = {
   "Team Name" :  team_name,
   "Player Name" :  player_name,
    "Runs" : runs,
   "Balls": balls,
    "Fours" : Fours,
   "Six": Six,
    "Strike Rate ":SR,
    "Venue" : venue,
    "Date":date,
    "Result" : result,
    "Opposotion Team" : opponent_team_name,
  };

  content.push(player_object);
  excel_writer(file_path, content, player_name);
}

function excel_writer(file_path, json, sheet_name) {
  let new_book = xlsx.utils.book_new();
  let new_sheet = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(new_book, new_sheet, sheet_name);
  xlsx.writeFile(new_book, file_path);
}

function excel_reader(file_path, sheet_name) {
  if (fs.existsSync(file_path) == false) {
    return [];
  }
  let wb = xlsx.readFile(file_path);
  let excel_data = wb.Sheets[sheet_name];
  let ans = xlsx.utils.sheet_to_json(excel_data);
  return ans;
}

function dir_creater(file_path) {
  if (fs.existsSync(file_path) == false) {
    fs.mkdirSync(file_path);
  }
}

function opponent_team(array, string) {
  let opponent = "";
  array.forEach(elem => {
      if (elem !== string) {
          opponent = elem;
          return; // Exit the loop after finding the opponent
      }
  });
  return opponent;
}
module.exports = {
  scorecard_detail: scorecard_details,
};

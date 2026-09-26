import addGame from './add-game';

// This file is made to get our API response data into a better/easier to use format for our app. We take the data we need
//Also has some filters per sport. MLB response calls it away team, while NBA and NFL calls it visitor team. Handles things like this
export function gameStore(data: Record<string, any> = {}) {
  const results: Record<string, any[]> = {
    nba: [],
    nfl: [],
    mlb: [],
  }
  let gameCount = 1;
  console.log(data)

  for (const sport of ['nba', 'nfl', 'mlb'] as const) {
    for(const game of data[sport]){ //['data']
      if(game.length === 0){
        console.log(`NO LENGTH ARRAY: ${game}`)
        continue
      }
      let gameData = {
      period: game['period'],
      time: '',
      teamOneScore: '',
      teamOneName: game['home_team']['name'],
      teamOneAbr: game['home_team']['abbreviation'],
      teamTwoName: '',
      teamTwoScore: '',
      teamTwoAbr: '',
      broadcast: game['broadcast'],
      status: '',
    }
    // NBA conditional data mappings
    if(sport == 'nba' || sport == 'nfl'){
      const time = new Date(game['datetime'])
      const estString = time.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
      });
        gameData.time = game['time'];
        gameData.teamOneScore = game['home_team_score'],
        gameData.teamTwoName = game['visitor_team']['name'];
        gameData.teamTwoScore = game['visitor_team_score']; 
        gameData.teamTwoAbr = game['visitor_team']['abbreviation'];
        if(sport == 'nfl'){
          gameData.status = game['status_state'];
          if(gameData.status == 'scheduled'){
            gameData.time = game['status']
          };
        }
        // Get game time it starts, or get game score
        else if(gameData.teamOneScore == '0' && gameData.teamTwoScore == '0'){
          gameData.time = estString;
          gameData.teamOneScore = '';
          gameData.teamTwoScore = '';
        }else{
          gameData.time
        };
    }
    // MLB conditional data mappings
    else if(sport == 'mlb'){ 
      const time = new Date(game['date'])
      const estString = time.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
      });
        // Get team data based on MLB response
        gameData.teamOneScore = game['home_team_data']['runs'];
        gameData.teamTwoName = game['away_team']['name'];
        gameData.teamTwoScore = game['away_team_data']['runs'];
        gameData.teamTwoAbr = game['away_team']['abbreviation'];
        // Get Game time, period, or 'Final' based on status of game
      if(game['status'] == 'STATUS_FINAL'){
        gameData.time = 'Final'
      }else if(game['status'] == 'STATUS_SCHEDULED'){
        gameData.time = estString;
        gameData.teamOneScore = '';
        gameData.teamTwoScore = '';
      }else if(game['status'].includes("DELAY") || game['status'].includes("RAIN")){
        gameData.time = 'Delay';
        gameData.teamOneScore = '';
        gameData.teamTwoScore = '';
      }else{
        gameData.time = `${game['period']}${(game['period'] == '1') ? 'st' : (game['period'] == '2') ? 'nd' : (game['period'] == '3') ? 'rd' : 'th'} Inn`;
      }
    }
    results[sport].push(addGame(gameCount, gameData));
    gameCount = gameCount + 1;
    }
  }
  console.log("Data Formatted for Frontend")
  return results;
}

//a function that takes a number, adds it to 'game' and makes it a object
// and the second argument is an object which is what is nested in that object
//and then it adds that to nba


// {
//     "nba": [],
//     "nfl": [
//         {
//             "id": 1392248,
//             "visitor_team": {
//                 "id": 27,
//                 "conference": "NFC",
//                 "division": "SOUTH",
//                 "location": "Atlanta",
//                 "name": "Falcons",
//                 "full_name": "Atlanta Falcons",
//                 "abbreviation": "ATL"
//             },
//             "home_team": {
//                 "id": 22,
//                 "conference": "NFC",
//                 "division": "NORTH",
//                 "location": "Green Bay",
//                 "name": "Packers",
//                 "full_name": "Green Bay Packers",
//                 "abbreviation": "GB"
//             },
//             "summary": null,
//             "venue": "Lambeau Field",
//             "week": 3,
//             "date": "2026-09-25T00:15:00.000Z",
//             "season": 2026,
//             "postseason": false,
//             "status": "9/24 - 8:15 PM EDT",
//             "status_state": "scheduled",
//             "home_team_score": null,
//             "home_team_q1": null,
//             "home_team_q2": null,
//             "home_team_q3": null,
//             "home_team_q4": null,
//             "home_team_ot": null,
//             "visitor_team_score": null,
//             "visitor_team_q1": null,
//             "visitor_team_q2": null,
//             "visitor_team_q3": null,
//             "visitor_team_q4": null,
//             "visitor_team_ot": null,
//             "broadcast": "Prime Video, NFL+, WAGA-FOX, WGBA-NBC, WITI-FOX, CTV, Crave, TSN1/3 (TSN4/5 JIP at 9 pm et), TSN Premium, RDS"
//         }
//     ],
//     "mlb": [
//         {
//             "id": 5060140,
//             "home_team_name": "Texas Rangers",
//             "away_team_name": "New York Mets",
//             "home_team": {
//                 "id": 28,
//                 "slug": "texas-rangers",
//                 "abbreviation": "TEX",
//                 "display_name": "Texas Rangers",
//                 "short_display_name": "Rangers",
//                 "name": "Rangers",
//                 "location": "Texas",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 18,
//                 "slug": "new-york-mets",
//                 "abbreviation": "NYM",
//                 "display_name": "New York Mets",
//                 "short_display_name": "Mets",
//                 "name": "Mets",
//                 "location": "New York",
//                 "league": "National",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T00:05:00.000Z",
//             "home_team_data": {
//                 "hits": 4,
//                 "runs": 2,
//                 "errors": 1,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     0,
//                     2,
//                     0,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 8,
//                 "runs": 7,
//                 "errors": 0,
//                 "inning_scores": [
//                     0,
//                     0,
//                     2,
//                     0,
//                     0,
//                     0,
//                     0,
//                     1,
//                     4
//                 ]
//             },
//             "venue": "Globe Life Field",
//             "attendance": 30188,
//             "conference_play": false,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 9,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Soto homered to right center (429 feet), Lindor scored.",
//                     "inning": "top",
//                     "period": "3rd",
//                     "away_score": 2,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Burger singled to left, Nimmo scored.",
//                     "inning": "bottom",
//                     "period": "5th",
//                     "away_score": 2,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Carter grounded into fielder's choice to second, Burger scored, Jansen out at second, Lopez to third.",
//                     "inning": "bottom",
//                     "period": "5th",
//                     "away_score": 2,
//                     "home_score": 2
//                 },
//                 {
//                     "play": "Semien homered to left center (388 feet).",
//                     "inning": "top",
//                     "period": "8th",
//                     "away_score": 3,
//                     "home_score": 2
//                 },
//                 {
//                     "play": "Baty homered to right center (455 feet), Morabito scored, Soto scored and Bichette scored.",
//                     "inning": "top",
//                     "period": "9th",
//                     "away_score": 7,
//                     "home_score": 2
//                 }
//             ],
//             "broadcast": "Peacock GOTD, MLB.TV, MLB Extra Innings, SNY, RSN, SN, SN+"
//         },
//         {
//             "id": 5060141,
//             "home_team_name": "Colorado Rockies",
//             "away_team_name": "Arizona Diamondbacks",
//             "home_team": {
//                 "id": 9,
//                 "slug": "colorado-rockies",
//                 "abbreviation": "COL",
//                 "display_name": "Colorado Rockies",
//                 "short_display_name": "Rockies",
//                 "name": "Rockies",
//                 "location": "Colorado",
//                 "league": "National",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 1,
//                 "slug": "arizona-diamondbacks",
//                 "abbreviation": "ARI",
//                 "display_name": "Arizona Diamondbacks",
//                 "short_display_name": "Diamondbacks",
//                 "name": "Diamondbacks",
//                 "location": "Arizona",
//                 "league": "National",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T00:40:00.000Z",
//             "home_team_data": {
//                 "hits": 7,
//                 "runs": 3,
//                 "errors": 1,
//                 "inning_scores": [
//                     0,
//                     1,
//                     1,
//                     0,
//                     0,
//                     0,
//                     0,
//                     1,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 8,
//                 "runs": 5,
//                 "errors": 0,
//                 "inning_scores": [
//                     4,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     1,
//                     0
//                 ]
//             },
//             "venue": "Coors Field",
//             "attendance": 21041,
//             "conference_play": true,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 9,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Moreno singled to left, Marte scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Arenado singled to left, Moreno scored, Smith to second.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 2,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Carroll tripled to right, Smith scored and Arenado scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 4,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Amador doubled to right, Karros scored.",
//                     "inning": "bottom",
//                     "period": "2nd",
//                     "away_score": 4,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Goodman hit sacrifice fly to left, Tovar scored.",
//                     "inning": "bottom",
//                     "period": "3rd",
//                     "away_score": 4,
//                     "home_score": 2
//                 },
//                 {
//                     "play": "Tawa homered to left (368 feet).",
//                     "inning": "top",
//                     "period": "8th",
//                     "away_score": 5,
//                     "home_score": 2
//                 },
//                 {
//                     "play": "Tovar homered to right (386 feet).",
//                     "inning": "bottom",
//                     "period": "8th",
//                     "away_score": 5,
//                     "home_score": 3
//                 }
//             ],
//             "broadcast": "MLBN, MLB.TV, MLB Extra Innings, DBacks.TV, Rockies.TV"
//         },
//         {
//             "id": 5060142,
//             "home_team_name": "Athletics",
//             "away_team_name": "Los Angeles Angels",
//             "home_team": {
//                 "id": 20,
//                 "slug": "oakland-athletics",
//                 "abbreviation": "OAK",
//                 "display_name": "Oakland Athletics",
//                 "short_display_name": "Athletics",
//                 "name": "Athletics",
//                 "location": "Oakland",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 13,
//                 "slug": "los-angeles-angels",
//                 "abbreviation": "LAA",
//                 "display_name": "Los Angeles Angels",
//                 "short_display_name": "Angels",
//                 "name": "Angels",
//                 "location": "Los Angeles",
//                 "league": "American",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T01:40:00.000Z",
//             "home_team_data": {
//                 "hits": 13,
//                 "runs": 7,
//                 "errors": 0,
//                 "inning_scores": [
//                     4,
//                     1,
//                     0,
//                     0,
//                     0,
//                     2,
//                     0,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 8,
//                 "runs": 3,
//                 "errors": 1,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     2,
//                     1,
//                     0,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "venue": "Sutter Health Park",
//             "attendance": 7430,
//             "conference_play": true,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 9,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Butler singled to left, Bolte scored.",
//                     "inning": "bottom",
//                     "period": "1st",
//                     "away_score": 0,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Walton homered to right (332 feet), McNeil scored and Gelof scored.",
//                     "inning": "bottom",
//                     "period": "1st",
//                     "away_score": 0,
//                     "home_score": 4
//                 },
//                 {
//                     "play": "Bolte doubled to right, Williams scored.",
//                     "inning": "bottom",
//                     "period": "2nd",
//                     "away_score": 0,
//                     "home_score": 5
//                 },
//                 {
//                     "play": "Trout homered to left (393 feet).",
//                     "inning": "top",
//                     "period": "4th",
//                     "away_score": 1,
//                     "home_score": 5
//                 },
//                 {
//                     "play": "Grissom homered to right center (386 feet).",
//                     "inning": "top",
//                     "period": "4th",
//                     "away_score": 2,
//                     "home_score": 5
//                 },
//                 {
//                     "play": "Grissom reached on infield single to shortstop, Heineman scored, Neto to third.",
//                     "inning": "top",
//                     "period": "5th",
//                     "away_score": 3,
//                     "home_score": 5
//                 },
//                 {
//                     "play": "Langeliers doubled to right, Bolte scored and Williams scored.",
//                     "inning": "bottom",
//                     "period": "6th",
//                     "away_score": 3,
//                     "home_score": 7
//                 }
//             ]
//         },
//         {
//             "id": 5060143,
//             "home_team_name": "Seattle Mariners",
//             "away_team_name": "Houston Astros",
//             "home_team": {
//                 "id": 25,
//                 "slug": "seattle-mariners",
//                 "abbreviation": "SEA",
//                 "display_name": "Seattle Mariners",
//                 "short_display_name": "Mariners",
//                 "name": "Mariners",
//                 "location": "Seattle",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 11,
//                 "slug": "houston-astros",
//                 "abbreviation": "HOU",
//                 "display_name": "Houston Astros",
//                 "short_display_name": "Astros",
//                 "name": "Astros",
//                 "location": "Houston",
//                 "league": "American",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T02:00:00.000Z",
//             "home_team_data": {
//                 "hits": 9,
//                 "runs": 6,
//                 "errors": 0,
//                 "inning_scores": [
//                     0,
//                     0,
//                     3,
//                     0,
//                     1,
//                     0,
//                     0,
//                     0,
//                     0,
//                     2
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 10,
//                 "runs": 5,
//                 "errors": 0,
//                 "inning_scores": [
//                     0,
//                     0,
//                     4,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     1
//                 ]
//             },
//             "venue": "T-Mobile Park",
//             "attendance": 24802,
//             "conference_play": true,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 10,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Altuve singled to left, Allen scored.",
//                     "inning": "top",
//                     "period": "3rd",
//                     "away_score": 1,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Paredes hit sacrifice fly to right, Altuve scored, Alvarez to third.",
//                     "inning": "top",
//                     "period": "3rd",
//                     "away_score": 2,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Diaz homered to left (358 feet), Alvarez scored.",
//                     "inning": "top",
//                     "period": "3rd",
//                     "away_score": 4,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Canzone singled to right, Crawford scored and Montes scored, Arozarena to third.",
//                     "inning": "bottom",
//                     "period": "3rd",
//                     "away_score": 4,
//                     "home_score": 2
//                 },
//                 {
//                     "play": "Rodríguez doubled to left, Arozarena scored, Canzone to third.",
//                     "inning": "bottom",
//                     "period": "3rd",
//                     "away_score": 4,
//                     "home_score": 3
//                 },
//                 {
//                     "play": "Canzone singled to center, Arozarena scored.",
//                     "inning": "bottom",
//                     "period": "5th",
//                     "away_score": 4,
//                     "home_score": 4
//                 },
//                 {
//                     "play": "Diaz tripled to right, Alvarez scored.",
//                     "inning": "top",
//                     "period": "10th",
//                     "away_score": 5,
//                     "home_score": 4
//                 },
//                 {
//                     "play": "Rodríguez walked, Crawford scored, Raleigh to second, Arozarena to third.",
//                     "inning": "bottom",
//                     "period": "10th",
//                     "away_score": 5,
//                     "home_score": 5
//                 },
//                 {
//                     "play": "Naylor singled to center, Arozarena scored, Rodríguez to second, Raleigh to third.",
//                     "inning": "bottom",
//                     "period": "10th",
//                     "away_score": 5,
//                     "home_score": 6
//                 }
//             ],
//             "broadcast": "MLB.TV, MLB Extra Innings, ABTV, Mariners.TV"
//         },
//         {
//             "id": 5060144,
//             "home_team_name": "Los Angeles Dodgers",
//             "away_team_name": "San Diego Padres",
//             "home_team": {
//                 "id": 14,
//                 "slug": "los-angeles-dodgers",
//                 "abbreviation": "LAD",
//                 "display_name": "Los Angeles Dodgers",
//                 "short_display_name": "Dodgers",
//                 "name": "Dodgers",
//                 "location": "Los Angeles",
//                 "league": "National",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 23,
//                 "slug": "san-diego-padres",
//                 "abbreviation": "SD",
//                 "display_name": "San Diego Padres",
//                 "short_display_name": "Padres",
//                 "name": "Padres",
//                 "location": "San Diego",
//                 "league": "National",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T02:10:00.000Z",
//             "home_team_data": {
//                 "hits": 10,
//                 "runs": 1,
//                 "errors": 1,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     1,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 8,
//                 "runs": 5,
//                 "errors": 0,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     2,
//                     2,
//                     0,
//                     0,
//                     0,
//                     1
//                 ]
//             },
//             "venue": "Dodger Stadium",
//             "attendance": 48201,
//             "conference_play": true,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 9,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Machado homered to center (409 feet), Harris scored.",
//                     "inning": "top",
//                     "period": "4th",
//                     "away_score": 2,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Edman hit sacrifice fly to left, T. Hernández scored.",
//                     "inning": "bottom",
//                     "period": "4th",
//                     "away_score": 2,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Harris grounded into fielder's choice to pitcher, Salas scored on throwing error by pitcher Yamamoto, Harris second, Tatis Jr. safe at third on error.",
//                     "inning": "top",
//                     "period": "5th",
//                     "away_score": 3,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Machado hit sacrifice fly to center, Tatis Jr. scored.",
//                     "inning": "top",
//                     "period": "5th",
//                     "away_score": 4,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Fermin singled to left, Taylor scored.",
//                     "inning": "top",
//                     "period": "9th",
//                     "away_score": 5,
//                     "home_score": 1
//                 }
//             ],
//             "broadcast": "MLBN, MLB.TV, MLB Extra Innings, Padres.TV, SNLA, TVAS, TVAS+, TVAS Direct"
//         },
//         {
//             "id": 5060145,
//             "home_team_name": "Pittsburgh Pirates",
//             "away_team_name": "St. Louis Cardinals",
//             "home_team": {
//                 "id": 22,
//                 "slug": "pittsburgh-pirates",
//                 "abbreviation": "PIT",
//                 "display_name": "Pittsburgh Pirates",
//                 "short_display_name": "Pirates",
//                 "name": "Pirates",
//                 "location": "Pittsburgh",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "away_team": {
//                 "id": 26,
//                 "slug": "st-louis-cardinals",
//                 "abbreviation": "STL",
//                 "display_name": "St. Louis Cardinals",
//                 "short_display_name": "Cardinals",
//                 "name": "Cardinals",
//                 "location": "St. Louis",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T16:35:00.000Z",
//             "home_team_data": {
//                 "hits": 7,
//                 "runs": 2,
//                 "errors": 0,
//                 "inning_scores": [
//                     1,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     1
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 5,
//                 "runs": 1,
//                 "errors": 2,
//                 "inning_scores": [
//                     1,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "venue": "PNC Park",
//             "attendance": 15822,
//             "conference_play": true,
//             "status": "STATUS_FINAL",
//             "status_state": "final",
//             "period": 9,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Burleson homered to right center (395 feet).",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Lowe singled to left, Cruz scored.",
//                     "inning": "bottom",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 1
//                 },
//                 {
//                     "play": "Horwitz hit sacrifice fly to center, Simon scored.",
//                     "inning": "bottom",
//                     "period": "8th",
//                     "away_score": 1,
//                     "home_score": 2
//                 }
//             ],
//             "broadcast": "MLBN, MLB.TV, MLB Extra Innings, Cardinals.TV, SNP"
//         },
//         {
//             "id": 5060146,
//             "home_team_name": "Kansas City Royals",
//             "away_team_name": "Chicago White Sox",
//             "home_team": {
//                 "id": 12,
//                 "slug": "kansas-city-royals",
//                 "abbreviation": "KC",
//                 "display_name": "Kansas City Royals",
//                 "short_display_name": "Royals",
//                 "name": "Royals",
//                 "location": "Kansas City",
//                 "league": "American",
//                 "division": "Central"
//             },
//             "away_team": {
//                 "id": 6,
//                 "slug": "chicago-white-sox",
//                 "abbreviation": "CHW",
//                 "display_name": "Chicago White Sox",
//                 "short_display_name": "White Sox",
//                 "name": "White Sox",
//                 "location": "Chicago",
//                 "league": "American",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T18:10:00.000Z",
//             "home_team_data": {
//                 "hits": 4,
//                 "runs": 1,
//                 "errors": 2,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     1
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 10,
//                 "runs": 8,
//                 "errors": 0,
//                 "inning_scores": [
//                     3,
//                     3,
//                     0,
//                     2,
//                     0
//                 ]
//             },
//             "venue": "Kauffman Stadium",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_IN_PROGRESS",
//             "status_state": "in_progress",
//             "period": 5,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Vargas singled to left, Antonacci scored, Teel to third.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Benintendi hit sacrifice fly to center, Teel scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 2,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Peters singled to center, Vargas scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 3,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "B. Montgomery scored on pickoff error by pitcher Dobnak, Antonacci picked off third.",
//                     "inning": "top",
//                     "period": "2nd",
//                     "away_score": 4,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "B. Montgomery scored on pickoff error by pitcher Dobnak, Antonacci picked off third.",
//                     "inning": "top",
//                     "period": "2nd",
//                     "away_score": 4,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Vargas singled to right, Antonacci scored, Teel to third.",
//                     "inning": "top",
//                     "period": "2nd",
//                     "away_score": 5,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Murakami grounded into fielder's choice to second, Teel scored, Vargas out at second.",
//                     "inning": "top",
//                     "period": "2nd",
//                     "away_score": 6,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Teel homered to center (424 feet).",
//                     "inning": "top",
//                     "period": "4th",
//                     "away_score": 7,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Peters grounded into fielder's choice to first, Vargas scored, Benintendi out at second, Murakami to third.",
//                     "inning": "top",
//                     "period": "4th",
//                     "away_score": 8,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Perez homered to left center (419 feet).",
//                     "inning": "bottom",
//                     "period": "4th",
//                     "away_score": 8,
//                     "home_score": 1
//                 }
//             ],
//             "broadcast": "MLB.TV, MLB Extra Innings, CHSN, Royals.TV"
//         },
//         {
//             "id": 5060147,
//             "home_team_name": "Chicago Cubs",
//             "away_team_name": "Miami Marlins",
//             "home_team": {
//                 "id": 5,
//                 "slug": "chicago-cubs",
//                 "abbreviation": "CHC",
//                 "display_name": "Chicago Cubs",
//                 "short_display_name": "Cubs",
//                 "name": "Cubs",
//                 "location": "Chicago",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "away_team": {
//                 "id": 15,
//                 "slug": "miami-marlins",
//                 "abbreviation": "MIA",
//                 "display_name": "Miami Marlins",
//                 "short_display_name": "Marlins",
//                 "name": "Marlins",
//                 "location": "Miami",
//                 "league": "National",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T18:20:00.000Z",
//             "home_team_data": {
//                 "hits": 3,
//                 "runs": 0,
//                 "errors": 1,
//                 "inning_scores": [
//                     0,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 5,
//                 "runs": 1,
//                 "errors": 0,
//                 "inning_scores": [
//                     0,
//                     0,
//                     1,
//                     0
//                 ]
//             },
//             "venue": "Wrigley Field",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_IN_PROGRESS",
//             "status_state": "in_progress",
//             "period": 4,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Marsee singled to center, Navarreto scored, Marsee to second.",
//                     "inning": "top",
//                     "period": "3rd",
//                     "away_score": 1,
//                     "home_score": 0
//                 }
//             ],
//             "broadcast": "ESPN Unlimited GOTD, MLB.TV, MLB Extra Innings, Marlins.TV, MARQ"
//         },
//         {
//             "id": 5060148,
//             "home_team_name": "Texas Rangers",
//             "away_team_name": "New York Mets",
//             "home_team": {
//                 "id": 28,
//                 "slug": "texas-rangers",
//                 "abbreviation": "TEX",
//                 "display_name": "Texas Rangers",
//                 "short_display_name": "Rangers",
//                 "name": "Rangers",
//                 "location": "Texas",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 18,
//                 "slug": "new-york-mets",
//                 "abbreviation": "NYM",
//                 "display_name": "New York Mets",
//                 "short_display_name": "Mets",
//                 "name": "Mets",
//                 "location": "New York",
//                 "league": "National",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T18:35:00.000Z",
//             "home_team_data": {
//                 "hits": 3,
//                 "runs": 2,
//                 "errors": 0,
//                 "inning_scores": [
//                     2,
//                     0,
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 3,
//                 "runs": 1,
//                 "errors": 0,
//                 "inning_scores": [
//                     1,
//                     0,
//                     0,
//                     0
//                 ]
//             },
//             "venue": "Globe Life Field",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_IN_PROGRESS",
//             "status_state": "in_progress",
//             "period": 4,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Benge singled to right, Lindor scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Jung homered to left (369 feet), Foscue scored.",
//                     "inning": "bottom",
//                     "period": "1st",
//                     "away_score": 1,
//                     "home_score": 2
//                 }
//             ],
//             "broadcast": "Peacock GOTD, MLB.TV, MLB Extra Innings, SNY, RSN, SN, SN+"
//         },
//         {
//             "id": 5060149,
//             "home_team_name": "Colorado Rockies",
//             "away_team_name": "Arizona Diamondbacks",
//             "home_team": {
//                 "id": 9,
//                 "slug": "colorado-rockies",
//                 "abbreviation": "COL",
//                 "display_name": "Colorado Rockies",
//                 "short_display_name": "Rockies",
//                 "name": "Rockies",
//                 "location": "Colorado",
//                 "league": "National",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 1,
//                 "slug": "arizona-diamondbacks",
//                 "abbreviation": "ARI",
//                 "display_name": "Arizona Diamondbacks",
//                 "short_display_name": "Diamondbacks",
//                 "name": "Diamondbacks",
//                 "location": "Arizona",
//                 "league": "National",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T19:10:00.000Z",
//             "home_team_data": {
//                 "hits": 1,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": [
//                     0
//                 ]
//             },
//             "away_team_data": {
//                 "hits": 5,
//                 "runs": 6,
//                 "errors": 0,
//                 "inning_scores": [
//                     6
//                 ]
//             },
//             "venue": "Coors Field",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_IN_PROGRESS",
//             "status_state": "in_progress",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [
//                 {
//                     "play": "Moreno homered to left (416 feet), Nootbaar scored and Marte scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 3,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Smith singled to left, Perdomo scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 4,
//                     "home_score": 0
//                 },
//                 {
//                     "play": "Arenado homered to left center (419 feet), Smith scored.",
//                     "inning": "top",
//                     "period": "1st",
//                     "away_score": 6,
//                     "home_score": 0
//                 }
//             ],
//             "broadcast": "MLBN, MLB.TV, MLB Extra Innings, DBacks.TV, Rockies.TV"
//         },
//         {
//             "id": 5060150,
//             "home_team_name": "Philadelphia Phillies",
//             "away_team_name": "Milwaukee Brewers",
//             "home_team": {
//                 "id": 21,
//                 "slug": "philadelphia-phillies",
//                 "abbreviation": "PHI",
//                 "display_name": "Philadelphia Phillies",
//                 "short_display_name": "Phillies",
//                 "name": "Phillies",
//                 "location": "Philadelphia",
//                 "league": "National",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 16,
//                 "slug": "milwaukee-brewers",
//                 "abbreviation": "MIL",
//                 "display_name": "Milwaukee Brewers",
//                 "short_display_name": "Brewers",
//                 "name": "Brewers",
//                 "location": "Milwaukee",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T22:05:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Citizens Bank Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, Brewers.TV, NBCSP"
//         },
//         {
//             "id": 5060151,
//             "home_team_name": "Boston Red Sox",
//             "away_team_name": "Cleveland Guardians",
//             "home_team": {
//                 "id": 4,
//                 "slug": "boston-red-sox",
//                 "abbreviation": "BOS",
//                 "display_name": "Boston Red Sox",
//                 "short_display_name": "Red Sox",
//                 "name": "Red Sox",
//                 "location": "Boston",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 8,
//                 "slug": "cleveland-guardians",
//                 "abbreviation": "CLE",
//                 "display_name": "Cleveland Guardians",
//                 "short_display_name": "Guardians",
//                 "name": "Guardians",
//                 "location": "Cleveland",
//                 "league": "American",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T22:45:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Fenway Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, CleGuardians.TV, NESN, SNO, SNE, SN+"
//         },
//         {
//             "id": 5060152,
//             "home_team_name": "New York Yankees",
//             "away_team_name": "Tampa Bay Rays",
//             "home_team": {
//                 "id": 19,
//                 "slug": "new-york-yankees",
//                 "abbreviation": "NYY",
//                 "display_name": "New York Yankees",
//                 "short_display_name": "Yankees",
//                 "name": "Yankees",
//                 "location": "New York",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 27,
//                 "slug": "tampa-bay-rays",
//                 "abbreviation": "TB",
//                 "display_name": "Tampa Bay Rays",
//                 "short_display_name": "Rays",
//                 "name": "Rays",
//                 "location": "Tampa Bay",
//                 "league": "American",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T23:05:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Yankee Stadium",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, Rays.TV, YES, SN+, TVAS, TVAS+, TVAS Direct"
//         },
//         {
//             "id": 5060153,
//             "home_team_name": "Atlanta Braves",
//             "away_team_name": "Cincinnati Reds",
//             "home_team": {
//                 "id": 2,
//                 "slug": "atlanta-braves",
//                 "abbreviation": "ATL",
//                 "display_name": "Atlanta Braves",
//                 "short_display_name": "Braves",
//                 "name": "Braves",
//                 "location": "Atlanta",
//                 "league": "National",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 7,
//                 "slug": "cincinnati-reds",
//                 "abbreviation": "CIN",
//                 "display_name": "Cincinnati Reds",
//                 "short_display_name": "Reds",
//                 "name": "Reds",
//                 "location": "Cincinnati",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-24T23:15:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Truist Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "FS1, FOX One, MLB.TV, MLB Extra Innings, Reds.TV, BravesVision"
//         },
//         {
//             "id": 5060154,
//             "home_team_name": "Seattle Mariners",
//             "away_team_name": "Los Angeles Angels",
//             "home_team": {
//                 "id": 25,
//                 "slug": "seattle-mariners",
//                 "abbreviation": "SEA",
//                 "display_name": "Seattle Mariners",
//                 "short_display_name": "Mariners",
//                 "name": "Mariners",
//                 "location": "Seattle",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 13,
//                 "slug": "los-angeles-angels",
//                 "abbreviation": "LAA",
//                 "display_name": "Los Angeles Angels",
//                 "short_display_name": "Angels",
//                 "name": "Angels",
//                 "location": "Los Angeles",
//                 "league": "American",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T01:40:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "T-Mobile Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, ABTV, Mariners.TV"
//         },
//         {
//             "id": 5060155,
//             "home_team_name": "Athletics",
//             "away_team_name": "Houston Astros",
//             "home_team": {
//                 "id": 20,
//                 "slug": "oakland-athletics",
//                 "abbreviation": "OAK",
//                 "display_name": "Oakland Athletics",
//                 "short_display_name": "Athletics",
//                 "name": "Athletics",
//                 "location": "Oakland",
//                 "league": "American",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 11,
//                 "slug": "houston-astros",
//                 "abbreviation": "HOU",
//                 "display_name": "Houston Astros",
//                 "short_display_name": "Astros",
//                 "name": "Astros",
//                 "location": "Houston",
//                 "league": "American",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T01:40:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Sutter Health Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, SCHN, NBCSCA, SNO, SNE, SN+"
//         },
//         {
//             "id": 5060156,
//             "home_team_name": "Los Angeles Dodgers",
//             "away_team_name": "San Diego Padres",
//             "home_team": {
//                 "id": 14,
//                 "slug": "los-angeles-dodgers",
//                 "abbreviation": "LAD",
//                 "display_name": "Los Angeles Dodgers",
//                 "short_display_name": "Dodgers",
//                 "name": "Dodgers",
//                 "location": "Los Angeles",
//                 "league": "National",
//                 "division": "West"
//             },
//             "away_team": {
//                 "id": 23,
//                 "slug": "san-diego-padres",
//                 "abbreviation": "SD",
//                 "display_name": "San Diego Padres",
//                 "short_display_name": "Padres",
//                 "name": "Padres",
//                 "location": "San Diego",
//                 "league": "National",
//                 "division": "West"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T02:10:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Dodger Stadium",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLBN, MLB.TV, MLB Extra Innings, Padres.TV, SNLA, TVAS, TVAS+, TVAS Direct"
//         },
//         {
//             "id": 5060187,
//             "home_team_name": "Boston Red Sox",
//             "away_team_name": "Chicago Cubs",
//             "home_team": {
//                 "id": 4,
//                 "slug": "boston-red-sox",
//                 "abbreviation": "BOS",
//                 "display_name": "Boston Red Sox",
//                 "short_display_name": "Red Sox",
//                 "name": "Red Sox",
//                 "location": "Boston",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 5,
//                 "slug": "chicago-cubs",
//                 "abbreviation": "CHC",
//                 "display_name": "Chicago Cubs",
//                 "short_display_name": "Cubs",
//                 "name": "Cubs",
//                 "location": "Chicago",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T17:05:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Fenway Park",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, CleGuardians.TV, NESN, SNO, SNE, SN+"
//         },
//         {
//             "id": 5060163,
//             "home_team_name": "Boston Red Sox",
//             "away_team_name": "Chicago Cubs",
//             "home_team": {
//                 "id": 4,
//                 "slug": "boston-red-sox",
//                 "abbreviation": "BOS",
//                 "display_name": "Boston Red Sox",
//                 "short_display_name": "Red Sox",
//                 "name": "Red Sox",
//                 "location": "Boston",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 5,
//                 "slug": "chicago-cubs",
//                 "abbreviation": "CHC",
//                 "display_name": "Chicago Cubs",
//                 "short_display_name": "Cubs",
//                 "name": "Cubs",
//                 "location": "Chicago",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T22:00:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Fenway Park",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, CleGuardians.TV, NESN, SNO, SNE, SN+"
//         },
//         {
//             "id": 5060157,
//             "home_team_name": "Detroit Tigers",
//             "away_team_name": "Pittsburgh Pirates",
//             "home_team": {
//                 "id": 10,
//                 "slug": "detroit-tigers",
//                 "abbreviation": "DET",
//                 "display_name": "Detroit Tigers",
//                 "short_display_name": "Tigers",
//                 "name": "Tigers",
//                 "location": "Detroit",
//                 "league": "American",
//                 "division": "Central"
//             },
//             "away_team": {
//                 "id": 22,
//                 "slug": "pittsburgh-pirates",
//                 "abbreviation": "PIT",
//                 "display_name": "Pittsburgh Pirates",
//                 "short_display_name": "Pirates",
//                 "name": "Pirates",
//                 "location": "Pittsburgh",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T22:40:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Comerica Park",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, SNP, DSN"
//         },
//         {
//             "id": 5060158,
//             "home_team_name": "Philadelphia Phillies",
//             "away_team_name": "Tampa Bay Rays",
//             "home_team": {
//                 "id": 21,
//                 "slug": "philadelphia-phillies",
//                 "abbreviation": "PHI",
//                 "display_name": "Philadelphia Phillies",
//                 "short_display_name": "Phillies",
//                 "name": "Phillies",
//                 "location": "Philadelphia",
//                 "league": "National",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 27,
//                 "slug": "tampa-bay-rays",
//                 "abbreviation": "TB",
//                 "display_name": "Tampa Bay Rays",
//                 "short_display_name": "Rays",
//                 "name": "Rays",
//                 "location": "Tampa Bay",
//                 "league": "American",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T22:40:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Citizens Bank Park",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, Brewers.TV, NBCSP"
//         },
//         {
//             "id": 5060159,
//             "home_team_name": "Washington Nationals",
//             "away_team_name": "New York Mets",
//             "home_team": {
//                 "id": 30,
//                 "slug": "washington-nationals",
//                 "abbreviation": "WSH",
//                 "display_name": "Washington Nationals",
//                 "short_display_name": "Nationals",
//                 "name": "Nationals",
//                 "location": "Washington",
//                 "league": "National",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 18,
//                 "slug": "new-york-mets",
//                 "abbreviation": "NYM",
//                 "display_name": "New York Mets",
//                 "short_display_name": "Mets",
//                 "name": "Mets",
//                 "location": "New York",
//                 "league": "National",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T22:45:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Nationals Park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, WPIX-11, Nationals.TV"
//         },
//         {
//             "id": 5060160,
//             "home_team_name": "New York Yankees",
//             "away_team_name": "Baltimore Orioles",
//             "home_team": {
//                 "id": 19,
//                 "slug": "new-york-yankees",
//                 "abbreviation": "NYY",
//                 "display_name": "New York Yankees",
//                 "short_display_name": "Yankees",
//                 "name": "Yankees",
//                 "location": "New York",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 3,
//                 "slug": "baltimore-orioles",
//                 "abbreviation": "BAL",
//                 "display_name": "Baltimore Orioles",
//                 "short_display_name": "Orioles",
//                 "name": "Orioles",
//                 "location": "Baltimore",
//                 "league": "American",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T23:05:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Yankee Stadium",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, Rays.TV, YES, SN+, TVAS, TVAS+, TVAS Direct"
//         },
//         {
//             "id": 5060161,
//             "home_team_name": "Toronto Blue Jays",
//             "away_team_name": "Cincinnati Reds",
//             "home_team": {
//                 "id": 29,
//                 "slug": "toronto-blue-jays",
//                 "abbreviation": "TOR",
//                 "display_name": "Toronto Blue Jays",
//                 "short_display_name": "Blue Jays",
//                 "name": "Blue Jays",
//                 "location": "Toronto",
//                 "league": "American",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 7,
//                 "slug": "cincinnati-reds",
//                 "abbreviation": "CIN",
//                 "display_name": "Cincinnati Reds",
//                 "short_display_name": "Reds",
//                 "name": "Reds",
//                 "location": "Cincinnati",
//                 "league": "National",
//                 "division": "Central"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T23:07:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "Rogers Centre",
//             "attendance": 0,
//             "conference_play": false,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLB.TV, MLB Extra Innings, Reds.TV, SN, SN+, TVAS, TVAS+, TVAS Direct"
//         },
//         {
//             "id": 5060162,
//             "home_team_name": "Miami Marlins",
//             "away_team_name": "Atlanta Braves",
//             "home_team": {
//                 "id": 15,
//                 "slug": "miami-marlins",
//                 "abbreviation": "MIA",
//                 "display_name": "Miami Marlins",
//                 "short_display_name": "Marlins",
//                 "name": "Marlins",
//                 "location": "Miami",
//                 "league": "National",
//                 "division": "East"
//             },
//             "away_team": {
//                 "id": 2,
//                 "slug": "atlanta-braves",
//                 "abbreviation": "ATL",
//                 "display_name": "Atlanta Braves",
//                 "short_display_name": "Braves",
//                 "name": "Braves",
//                 "location": "Atlanta",
//                 "league": "National",
//                 "division": "East"
//             },
//             "season": 2026,
//             "postseason": false,
//             "season_type": "regular",
//             "date": "2026-09-25T23:10:00.000Z",
//             "home_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "away_team_data": {
//                 "hits": 0,
//                 "runs": 0,
//                 "errors": 0,
//                 "inning_scores": []
//             },
//             "venue": "loanDepot park",
//             "attendance": 0,
//             "conference_play": true,
//             "status": "STATUS_SCHEDULED",
//             "status_state": "scheduled",
//             "period": 1,
//             "clock": 0,
//             "display_clock": "0:00",
//             "scoring_summary": [],
//             "broadcast": "MLBN Alt., MLB.TV, MLB Extra Innings, BravesVision, Marlins.TV"
//         }
//     ]
// }
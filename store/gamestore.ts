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
        // Get game time it starts, or get game score
        if(gameData.teamOneScore == '0' && gameData.teamTwoScore == '0'){
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
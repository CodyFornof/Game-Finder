import addGame from './add-game';

export function gameStore(data: Record<string, any> = {}) {
  const nba = new Array();
  let gameCount = 1;
  const dataArray = data['data'];
  for(const game of dataArray){
    let gameData = {
      period: game['period'],
      time: game['time'],
      teamOneName: game['home_team']['name'],
      teamOneScore: game['home_team_score'],
      teamTwoName: game['visitor_team']['name'],
      teamTwoScore: game['visitor_team_score'],
    }
    nba.push(addGame(gameCount, gameData));
    gameCount = gameCount + 1;
  }
  return nba;
};


//a function that takes a number, adds it to 'game' and makes it a object
// and the second argument is an object which is what is nested in that object
//and then it adds that to nba
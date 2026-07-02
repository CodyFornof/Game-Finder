//This is so our data of each game isn't in big chunks, it is separated by each game
// Seperated by "Game1", "Game2", etc.
export default function addGame(gameNum : number, gameObj: object){
    const objectName = "game" + gameNum;
    const game = {
        [objectName]: gameObj
    }
    return game
}
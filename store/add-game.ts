export default function addGame(gameNum : number, gameObj: object){
    const objectName = "game" + gameNum;
    const game = {
        [objectName]: gameObj
    }
    return game
}
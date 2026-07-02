const apiKey = process.env.API_KEY
const baseUrl = process.env.BASE_URL!
console.log(baseUrl)

// Makes API call, logs and returns the json repsonse
export async function getGameData() {
  const response = await fetch('https://game-finder-backend-production.up.railway.app/bootstrap')
  console.log("Response Recieved")
return response.json()
};


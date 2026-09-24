System Architecture

1. High Level Overview

2. Technologies Used
We used React Native framework with JS and typescript.

3. Folder Structure
app>
finder.tsx - main home screen page
game-details.tsx - Screen when a game is tapped
components>
parallax-scroll-view.tsx - holds the bar at the top. Game finder logo and the league container at the top
Any UI buttons or animations used throughout the app
Constants >
Styles.ts - holds all style exports
Theme.ts
Context >
AppContext.tsx - good for sending variables from fil to file/screen to screen if needed
Services and Store >
Services like api call files
Store can hold files that organize the service data
Hooks >
Ties all of the data together - useEffect that sets the order of data from receive to use


4. Data Flow
Our data consists of two main sources. We use the BALLDONTLIE api (https://www.balldontlie.io/) for latest game updates. The second source is our webscraped data that pulls in the broadcast/network data, which is pulled from sportsmediawatch.com. The backend then links each game from the API to the scraped data to be displayed.


5. Frontend
A majority of the front end is done in one screen - the home screen. While added features will improve GameFinder, we plan on keeping the main screen simple and the main screen for the app. Game Details can also be shown when clicked on a game, giving a scroll view of the networks.


6. Backend
The Backends main purpose is to make API calls. We also use the web scraper in the backend in scraper.ts. Each services file calls a different API endpoint, done for each league. Bootstrap is the center file for the backend which sets up any error logging, Gets the current dates needed for each game to feed into the API call, calls the API and scraper functions, and runs a data map to combine the API and scraper data for each game.


7. External APIs
The external APIs are currently BALLDONTLIE. We use the NBA, MLB, and NFL API endpoint. We plan to soon make our own API for this app in later versions - with the goal GameFinder phasing out BALLDONTLIE API services all together. 


8. Navigation
Navigation is minimal and conisists of our scroll view which is mostly held in parallax-scroll-view.tsx in components. This can also take in a FixedHeader if we want to keep anything on the screen outside of the scroll view. This allows us to return the entire scroll view. In our home screen, we use this to keep the League bar at the top and above the scroll view.


9. Security
There is minimum security currently as there are no user authentication, account creation, transactions, etc. While we currently do not see any use for these features, if this is added in later versions, neccesary security will be added and this documentation will be updated.


10. Future Improvements
Fix the NFL time datapoints
Make the container holding the network names dynamic based on the wrap of the text)
Add an animation that the underline of the league name moves smoothly
Add a scroll up and it refreshes
Add a feature where they can include what channels/streaming services they have - which adds a star on what games they can watch.
Make game count in the data start at game 1 for each league
Make the Frontend refresh with the API so it is auto refreshing and doesn't have to be reopened
Make the day show like "Today", "Tomorrow" games so on
Add NHL and major sport leagues

I originally wanted the app to call the APIs directly, but discovered CORS restrictions. The backend acts as a proxy and keeps API keys hidden.
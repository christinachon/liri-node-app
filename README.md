# liri-node-app
This app takes in various commands and will display information to the user. It easily gathers data for the user so they can quickly look up where an artist is having their concert, movie information, and look up song details.

#Overview
The app takes a look at the third word that is typed and will execute a certain function depending on if it matches a certain phrase. The "concert-this" command will execute a concert function that searches the Bands in Town Artist Events API and displays the name of venue, location, and concert date. The "spotify-this-song" will use the Spotify API to display the artist, song name, spotify link, and album title. The "movie-this" searches the OMDB API to display the title, year, ratings, country, language, plot, and actors. The "do-what-it-says" will look at the .txt file to see which of the three functions to execute.

#Instructions
Type in "node liri" then either 1) concert-this "artist/band name here", 2)spotify-this-song "song name here"or 3) movie-this "movie title here"

Press enter and you will see the displayed information. If you just put a command and no title/artist/movie to search, a default song and movie will show up.

#Link
https://drive.google.com/file/d/1zO1XH44rGFCt5Dc5wsRKXSdmbaH75I_H/view

#Technologies
LIRI
Node-Spotify-API
Axios
Moment
DotEnv
Node.js
Javascript

#My Role
I created the application and pulled from previous assignments to figure out how to organize the code. 

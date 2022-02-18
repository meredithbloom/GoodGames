# heroku-meredith-bloom #

## GoodGames (GGs)
###an app where users can catalog and track their video games

**Features**
Users can:
1. Create an account to view (and add to) the app's catalog of games, as well as build their own game index, where they can keep track of the games that they own/are currently playing.
2. Users can see more details about each video game, including the gaming platforms, genres, and number of players/game modes supported.
3. Users can customize their profile to show which platforms they own, which genres they like, and which game modes (# of players) they play.
4. Users can delete their account.

Regular users **cannot** edit or delete the games in the main database. This functionality is only available to users with **admin** privileges (me :) ).

Other details:
- App checks for password authentication, as well as duplicate usernames and game entries. If someone tries to create an account with a username that already exists, they will be prompted to choose a different username. Likewise, if a user tries to enter a video game that is already in the database, they will be prompted to enter a different one. 

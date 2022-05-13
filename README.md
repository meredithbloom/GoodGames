# GoodGames (GGs)
### An app where users can catalog and track their video games
https://enigmatic-retreat-88307.herokuapp.com/

**Technical Features**

Users can:
1. Create an account to view (and add to) the app's catalog of games, as well as build their own game index, where they can keep track of the games that they own/are currently playing.
2. Users can see more details about each video game, including the gaming platforms, genres, and number of players/game modes supported.
3. Users can customize their profile to show which platforms they own, which genres they like, and which game modes (# of players) they play. They can also add/remove games from their game list.
4. Dropdown menus support picking multiple options. Hold COMMAND and click on as many as you want (Mac), equivalent on windows should be CTRL.
5. Users can delete their account.

Regular users **cannot** edit or delete the games in the main database. This functionality is only available to users with **admin** privileges (me :) ).

Other details:
- Three controllers: one for sessions, one for users, one for games
- Users can log in and log out, with changes made to their profiles/lists persisting across multiple sessions.
- App checks for password authentication, as well as duplicate usernames and game entries. If someone tries to create an account with a username that already exists, they will be prompted to choose a different username. Likewise, if a user tries to enter a video game that is already in the database, they will be prompted to enter a different one.
- Two model(schema) app, with a one(user)-to-many(games) relationship.
- Seed route!
- Utilized partials for heads and headers - content of nav bar and tab name changed depending on user (id) and user status (logged in or not).
- Used genre, game mode, and platform models to create drop-down menus that users can select **multiple** options from. Used images to represent platforms and game modes, rather than just text.
- Tiny bit of DOM manipulation with cute but ultimately meaningless bookmark icon on game show pages.


**Technical Challenges / Improvements**
1. Connecting to existing external database of video games. I tried to connect to Twitch's API for IGDB (the largest free video game database) for like three days - eventually gave up. Started with mock data, and gradually hard coded actual games. Feel free to add your own!
2. Connecting the user and game models/controllers so that users could update their game lists without having to edit through their profile. I wanted users to be able to "bookmark" games on the main game index, which would then add those game object Ids to their account, but didn't even really know where to start.
3. I wanted users to be able to remove games from their game list while browsing their list (deleting games directly from their currentGames array without removing them from the larger database of games). But I couldn't figure this out.
4. I originally wanted users to have three running lists of games: games completed, games they're currently playing, and games they want to play. I wanted to find a way to easily move games between these three arrays of object IDs, ideally using some kind of cute radio button functionality.
5. I'd really like to add some social components. Not necessarily so users could see each other's profiles (although that could be cool too), but so users could rate/comment on games they'd completed, and then those ratings/comments would be visible on each game's show page for other users to view.
6. I was very interested in adding some kind of filter functionality on the main game index, so users could filter by gaming platform/genre/game mode. Search bar would be great too.
7. Async/await functions... ?!?! I don't even know where to start with these, but I suspect that a lot of the things I wanted to do required this kind of function.
8. Mobile/tablet/multi-browser responsiveness.
9. Forgot/recover password functionality. Some kind of automatic email deployment.

**What I Learned**
- I have a lot of difficulty understanding documentation. I'm a very visual person, so finding diagrams of the MVC, request/response cycle was wayyyy more helpful to me than a lot of the documentation. The fact that everyone uses "var" really confuses me. That being said, mongoose documentation really helped me with schemas/object IDs.
- I can't teach myself everything. In fact, I can't teach myself most things, lol.
- Learned a lot more about the MVC structure. There were some big conceptual leaps and I feel like I sort of got there, at least enough that I was able to successfully have three controllers.
- Managing feelings of frustration and, at times, even panic. On Monday I felt totally overwhelmed, since I'd spent all weekend working on something that I ultimately had to scrap completely. Definitely the most frustrated I've felt in a while, certainly during this class.
- Learning when to step away from my code, reassess my expectations.
- Sometimes things just click. I didn't actually successfully connect my user and game models (and add a "my games" page) until Thursday. Things just kind of came together for me conceptually.

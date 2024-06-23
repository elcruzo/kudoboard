## Unit Assignment: Kudos Board

Submitted by: **Ayomide Caleb Adekoya**

Deployed Application (optional): [Kudos Board Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [x] **Home Page**
  - [x] Displays header, banner, search, board grid, and footer.
  - [x] Displays preview of all boards on initial page load.
    - [x] Boards previews should show an image/gif and board title.
  - [x] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [x] Recent displays most recently created boards.
    - [x] Other categories display boards of that type.
  - [x] Users can search for a board by name.
  - [x] Users can click on a board to navigate to a new page containing that board.
  - [x] Users can create a new board.
    - [x] Boards should have a title, category, and author (optional).
  - [x] User can delete boards.

- [x] **Board Page**
  - [x] Displays a list of all cards for a board.
    -  [x] Each card features a text message.
    -  [x] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [x] Users can optionally sign the card as the author.
-   [x] Cards can be upvoted.
-   [x] Cards can be deleted.


#### STRETCH FEATURES


- [x] **Deployment**
  - [x] Website is deployed via Render.
- [x] **Comments**
  - [x] Users should be able to comment on cards.


### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

`ADD_EMBEDDED_CODE_HERE`

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I hit a roadblock when I tried to implement the delete boards button after adding cards. It took me a while but I figured out that it was a database issue where you can't delete a board(parent) if it has cards in it(cards) because ech card is associated with a board and so deleteing a board means cards will exist without a board. The solution was to add something known as "Cascading" to allow the delete function to first delete every child component before deleting the parent component.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

If I had more time, I probably would have added more styles to make my web app more appealing to the eye

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Add your response here

### Open-source libraries used

- [Font Awesome Library](https://fontawesome.com/)

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

Shoutout to Sammy for his help!

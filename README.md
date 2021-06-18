# Genetic Algo Text Matching

This project was hugely mainly by the Coding Train[Youtube Channel](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw), other inspirators include Code Bullet[Youtube Channel](https://www.youtube.com/channel/UC0e3QhIYukixgh5VVpKHH9Q) and Tech with Tim(https://www.youtube.com/channel/UC4JX40jDee_tINbkjycV4Sg)

Click here for a [live demonstration](https://romantic-bhaskara-dc0b13.netlify.app/)

This Project uses an implementation of Neuro Evolution
* calculates fitness
* repopulates/copy
* mutates
* repeat

The fitness Calculation is in the order of 2 and finding the parents is using a normal fitness methodology.
## Multiple insights
* the screen size is important as the first pipe comes from the right most part of the screen , so more the time the first pipe needs to reach the birds at the left end, more the scores will be horrible as the birds will think simply doing anything will work, hence on laptop full screen it will take huge generations in the order of 500 to train a good brain, but if you do it in a mobile sized browser it will be trained in a couple of 10 , 30 generations
* the jump paramter hughely influenced, the best position seemed to be a gentle jump in opposed to a strong jump i had in the begining
* 2, 3 cross over methods are demonstrated in the code, one is copy and mutate only (demonstrated by daniel shiffman) seems to be working well in this case as the game does not require high tuning, the traditional cross over is also implemented in code.


## side note:
* all textures all included for a future revamp if necessary.
* level 6 is default level 8 is for very narrow pipe distance
*  p5 went crazy with pipe textures usually so better to train with show_pipes off as in the front end, (right now texture for pipes has been disabled, but it is present in code)

## Available Scripts

In the project directory, you can run:
### `npm install`
### `npm run start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

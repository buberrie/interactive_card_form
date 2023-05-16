This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Links

- Solution URL: [Add solution URL here](https://github.com/buberrie/interactive_card_form)
- Live Site URL: [Add live site URL here](interactive-card-form-8lsj0ty4n-buberrie.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- LESS
- Flexbox
- Mobile-first workflow
- TypeScript

### What I learned

```js
inputCardNum.addEventListener('paste', (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedText = e.clipboardData?.getData('text/plain') || '';
  const formattedText = pastedText.replace(/(\d{4})(?=\d)/g, '$1 ');
  inputCardNum.value = formattedText;
});
```

### Useful resources

- [LESS](https://lesscss.org/) - This helped me on how to begin with LESS stylesheet .
- [TypeScript](https://www.typescriptlang.org/) - This helped me understand simple basics of typescript that I used for this project.
- [TypeScript compilation](https://www.youtube.com/watch?v=d56mG7DezGs) - This is an amazing tutorial, it explains alot. It helped me figure out how to compile  my Ts sript to browser readable Js script. And also how to configure Ts compiler.

## Author

- Frontend Mentor - [@buberrie](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@gloria_oluebube](https://www.twitter.com/yourusername)
- Instagram - [bubecodes](https://www.your-site.com)
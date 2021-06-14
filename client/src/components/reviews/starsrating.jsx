import React from 'react';
import ReactDOM from 'react-dom';

const StarRating = (props) => {
  let star1_2 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
  fill="url('#half')" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>  <defs>
  <linearGradient id="half">
    <stop offset="0%" stop-color="gray" />
    <stop offset="50%" stop-color="gray" />
    <stop offset="50%" stop-color="white" />
    <stop offset="100%" stop-color="white" />
  </linearGradient>
 </defs></svg>

 let star1_4 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
 fill="url('#fourth')" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>  <defs>
 <linearGradient id="fourth">
   <stop offset="0%" stop-color="gray" />
   <stop offset="33.333%" stop-color="gray" />
   <stop offset="33.333%" stop-color="white" />
   <stop offset="100%" stop-color="white" />
 </linearGradient>
 </defs></svg>

 let star3_4 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
 fill="url('#third')" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>  <defs>
 <linearGradient id="third">
   <stop offset="0%" stop-color="gray" />
   <stop offset="66.666%" stop-color="gray" />
   <stop offset="66.666%" stop-color="white" />
   <stop offset="100%" stop-color="white" />
 </linearGradient>
 </defs></svg>

 let star_full = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
 fill="url('#full')" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>  <defs>
 <linearGradient id="full">
   <stop offset="0%" stop-color="gray" />
   <stop offset="100%" stop-color="gray" />
 </linearGradient>
 </defs></svg>

 let star_empty = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
 fill="url('#empty')" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>  <defs>
 <linearGradient id="empty">
   <stop offset="0%" stop-color="white" />
   <stop offset="100%" stop-color="white" />
 </linearGradient>
 </defs></svg>


  const starArray = [0,0,0,0,0];
  let rating = props.rating;
  let decimal = rating % 1;
  console.log('decom;', decimal)
  for (let i = 0; i < rating; i++) {
    starArray[i] = 1;
    if (decimal) {
      starArray[Math.floor(rating)] = decimal;
    }
  }
  let star;
  console.log('thsi is the rating: ', rating);
  console.log('starArray: ', starArray);
  const stars = starArray.map((item, index) => {
    if (item === 1) {
      star = star_full;
    } else if (item > 0 && item < .4) {
      star = star1_4;
    } else if (item >= .4 &&  item < .8) {
      star = star1_2;
    } else if (item >= .8 && item < 1) {
      star = star3_4;
    } else {
      star = star_empty;
    }

    return (
      <span key={index}>{star}</span>
    );
  });

  return (
    <span>
      {stars}
    </span>

  )
};

export default StarRating;

// const StarRating = (props) => {
  //   const starArray = [0,0,0,0,0];
  //   let rating = props.rating;
  //   for (let i = 0; i < rating; i++) {
  //     starArray[i] = 1;
  //   }
  //   let star;
  //   const stars = starArray.map((item, index) => {
  //     if (item === 1) {
  //       star = '★';
  //     } else {
  //       star = '☆';
  //     }
  //     return (
  //       <span key={index}>{star}</span>
  //     );
  //   });

  //   return (
  //     <span>
  //       {stars}
  //     </span>

  //   )
  // };
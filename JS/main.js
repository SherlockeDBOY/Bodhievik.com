const slideContainer = document.querySelector('.slider-container');
const slide = document.querySelector('.vid-slider');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const videoFrame = document.querySelectorAll('iframe');
const interval = 5000;
const option = {
  threshold:0,
  root:null,
  rootMargin: '0px'
}



const loginPopup = document.querySelector(".login-popup");
const close = document.querySelector(".close");


window.addEventListener("load",function(){

  showPopup();
 // setTimeout(function(){
 //   loginPopup.classList.add("show");
 // },5000)
})

function showPopup(){
      const timeLimit = 3 // seconds;
      let i=0;
      const timer = setInterval(function(){
        i++;
        if(i == timeLimit){
          clearInterval(timer);
          loginPopup.classList.add("show");
        } 
        console.log(i)
      },1000);
}


close.addEventListener("click",function(){
  loginPopup.classList.remove("show");
})



let slides = document.querySelectorAll('.vid-slides');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slide);

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
}

slide.addEventListener('transitionend', () =>{
  slides = document.querySelectorAll('.vid-slides');
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () =>{
  slides = document.querySelectorAll('.vid-slides');
  if (index>=slides.length-1) {
    return;
  }
    index++;
    slide.style.transition = '.7s ease-out';
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
}
const moveToPrevSlide = () =>{
  if (index<=0) {
    return;
  }
    index--;
    slide.style.transition = '.7s ease-out';
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
}

slideContainer.addEventListener('mouseenter', () =>{
  clearInterval(slideId);
});

const videoOnFrame = new IntersectionObserver(
  function (entries, videoOnFrame) {
    entries.forEach(entry => {
      if (!entry.isIntersecting){
          return;
      }else {
        clearInterval(slideId);
          videoOnFrame.unobserve(entry.target);
      }
  });
  }, option
);


slideContainer.addEventListener('mouseleave', () =>{
  startSlide();
});
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);

startSlide();

// const startSlide = () => {
//   slideId = setInterval(() => {
//     moveToNextSlide();
//   }, interval);
// };

// const getSlides = () => document.querySelectorAll('.slide');

// slide.addEventListener('transitionend', () => {
//   slides = getSlides();
//   if (slides[index].id === firstClone.id) {
//     slide.style.transition = 'none';
//     index = 1;
//     slide.style.transform = `translateX(${-slideWidth * index}px)`;
//   }

  // if (slides[index].id === lastClone.id) {
  //   slide.style.transition = 'none';
  //   index = slides.length - 2;
  //   slide.style.transform = `translateX(${-slideWidth * index}px)`;
  // }
// });

// const moveToNextSlide = () => {
//   slides = getSlides();
//   if (index >= slides.length - 1) return;
//   index++;
//   slide.style.transition = '.7s ease-out';
//   slide.style.transform = `translateX(${-slideWidth * index}px)`;
// };

// const moveToPreviousSlide = () => {
//   if (index <= 0) return;
//   index--;
//   slide.style.transition = '.7s ease-out';
//   slide.style.transform = `translateX(${-slideWidth * index}px)`;
// };

// slideContainer.addEventListener('mouseenter', () => {
//   clearInterval(slideId);
// });

// slideContainer.addEventListener('mouseleave', startSlide);
// nextBtn.addEventListener('click', moveToNextSlide);
// prevBtn.addEventListener('click', moveToPreviousSlide);

// startSlide();

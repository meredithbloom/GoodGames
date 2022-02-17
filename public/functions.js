//static functions


// const icon = document.getElementById('bookmark')



// document.querySelector("icon").onclick
const icon = document.querySelector("#bookmark");



const bookmark = () => {
  icon.classList.toggle('fi-rr-bookmark');
  icon.classList.toggle('fi-sr-bookmark');
}

icon.onclick = bookmark;

// icon.addEventListener('onclick', () => {
//   console.log('Hello')
// })

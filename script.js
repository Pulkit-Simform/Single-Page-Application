'use strict'

const API_STR = "https://kontests.net/api/v1"

const ALL_SITES = new Set();
const ALL_SITES_CONTEST = new Map();
let data = new Array();
const contestData = document.querySelector('#contestData');

const fetchingDataOnLoad = fetch(API_STR+"/all")
.then(r=>r.json())
.then(data => data);

function putDataInMap(el,count){
    let obj = {}
    obj["count"] = count;
    ALL_SITES_CONTEST.set(el.site,obj);

}

function countIn24Hours(data){
    const arr = []

    data.map(el => el.in_24_hours === "Yes" ? arr.push(el) : null);
    
    arr.map(el => {
        let obj = ALL_SITES_CONTEST.get(el.site)
        obj.in_24_hours = 1;
        ALL_SITES_CONTEST.set(el.site,obj)
    });

}


const contestDataAdding = (el,key) => {
    const classListArr = ["p-4", "md:w-1/3","lineUp"]

    const map = new Map();
    map.set("in_24_hours","bg-green-500 text-white p-2");
    map.set("none","bg-red-400 text-white p-2");
    

    const htmlStr = `    
              <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="assets/${key}.png" alt="blog">
                <div class="p-6">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${key}</h1>
                  <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                  <div class="flex items-center flex-wrap ">
                    <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                      <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span class="text-black-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto text-md pr-3 py-1 border-gray-200 ${el.in_24_hours ? map.get('in_24_hours') : map.get('none')}">
                     In 24 Hours : ${el.in_24_hours ? el.in_24_hours : "No Event"}
                    </span>               
                  </div>
                </div>
              </div>            
    `

    let sectionDiv = document.createElement("div");
    sectionDiv.classList.add(...classListArr);
    sectionDiv.innerHTML = htmlStr
    contestData.appendChild(sectionDiv);
}

document.getElementById("contactForm")?.addEventListener("click",() => {
    const name = document.getElementById("name");
    const email = document.getElementById("email")
    const message =  document.getElementById("message")
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(emailRegex.test(email.value) && name.value.length > 0 && message.value.length > 0) {        
        let obj = {name:name.value,email:email.value,message:message.value}
        localStorage.setItem("userInfo",JSON.stringify(obj))
        document.getElementById("contactUs")?.classList.add("hidden");
        document.getElementById("contactFormShow")?.classList.remove("hidden");

        const user = JSON.parse(localStorage.userInfo);        
        if(user!==null){
          document.getElementById("userNameShow").innerText = user.name;
          document.getElementById("emailShow").innerText = user.email;
        }

    }
    else alert("Please Provide The Proper Data");
 
})



const imageContentAdd = () => {
  
  const imageContent = document.getElementById("imageContentAdded")

  const imageStr = (i) => `
    <img
      src="assets/${i}.png"
      alt="${i}"
    />
  `
  const imgMainDiv = document.createElement("div");
  

  ALL_SITES.forEach(i => {
    const img = document.createElement("div");
    img.classList.add("slide")
    img.innerHTML = imageStr(i)
    console.log(img);
    imgMainDiv.appendChild(img)
  });

  imageContent?.appendChild(imgMainDiv);
  // console.log(imageContent)

}


// Data fetch and insert will be occured from here
window.onload = async () => {
    data = await fetchingDataOnLoad;
    
    data.map(el => {
        ALL_SITES.add(el.site)
        ALL_SITES_CONTEST.get(el.site) ? putDataInMap(el,++ALL_SITES_CONTEST.get(el.site).count) : putDataInMap(el,1);
    });

    countIn24Hours(data);
    
    ALL_SITES_CONTEST.forEach((i,key) => {
        // ++c;
        // if(c > 3) { null; }
        contestDataAdding(i,key);
    });
      // filter(())

    // addNavbarToContestData();

    // Image Content Add
    imageContentAdd();

  
};




// -------- --------------- For Slider ----------------------

// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX property to index * 100% 
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});


let curSlide = 0;

// select next slide button
const nextSlide = document.querySelector(".btn-next");

let maxSlide = slides.length - 1;

// add event listener and next slide functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});


const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide --;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});




// const imageContentAdd = () => {
  
//   const imageContent = document.getElementById("imageContentAdded")

//   const imageStr = (i) => `
//     <img
//       src="assets/${i}.png"
//       alt="${i}"
//     />
//   `
//   const imgMainDiv = document.createElement("div");
  

//   ALL_SITES.forEach(i => {
//     const img = document.createElement("div");
//     img.classList.add("slide")
//     img.innerHTML = imageStr(i)
//     console.log(img);
//     imgMainDiv.appendChild(img)
//   });

//   imageContent?.appendChild(imgMainDiv);
//   // console.log(imageContent)

// }



// const addNavbarToContestData = () => {
//   const n = Math.ceil(ALL_SITES_CONTEST.size/3);
//   const addNavArr = [];
//   const navStr = (i) => {
//     return `
//       <li>
//         <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="nav-${i}">${i}</a>
//       </li>
//     `
//   }

//   for(let i=1;i<=n;i++){
//     addNavArr.push(navStr(i));
//   }

  

//   const htmlStr = [`
// <nav aria-label="Page navigation example">
// <div class="justify-center items-center m-5 ml-5">
//   <ul class="inline-flex items-center -space-x-px">
//     <li>
//       <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//         <span class="sr-only">Previous</span>
//         <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//       </a>
//     </li>`,
// ...addNavArr,
// `
//     <li>
//       <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//         <span class="sr-only">Next</span>
//         <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
//       </a>
//     </li>
//   </ul>
// </nav>
// </div>
//   `]

//   document.getElementById("contestData").insertAdjacentHTML("afterend",htmlStr.join(' '))

// }
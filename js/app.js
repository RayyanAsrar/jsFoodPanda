// // let obj= {
// //     firstName:"Rayyan",
// //     lastName:"Asrar",
// //     rollNumber:327038,
// //     classDays:["Monday","Tuesday","Wednesday"],
// // }
// // console.log(obj.email="mrayyanasrar");
// // console.log(obj);

// // let person = {
// //     name: "Ali",
// //     greet: function() {
// //         console.log(person.name);
// //         console.log(this.name);
// //     }
// //   };

// //   person.greet(); // "Ali"
// function Student(a,b,c){
//     this.firstName=a
//     this.lastName=b
//     this.rollnumber=c

// }
// Student.prototype.getStudentInfo= function() {
//     return `the name of the student is ${this.firstName} ${this.lastName} and his rollnumber is ${this.rollnumber}`
// }
// //  console.log(new Student("rayyan","asrar",11));

//  let arr=[
//     new Student("rayyan","asrar",11),
//     new Student("ali","ahmed",14),
//     new Student("hussain","moiz",10),

//  ]
// //  console.log(arr[2].getStudentInfo());
// //  console.log(Student.prototype);

// //  console.log(arr);
//  for (let i = 0; i < arr.length; i++) {
//     let element = arr[i];
//     for(let key in element){
//         console.log(element[key]);

//     }

//  }

// //  let student={
// //     firstName:"Rayyan",
// //     lastName:"Asrar",
// //  }
// //  for(let key in student){
// // console.log(student[key]);
// //  }
function navTohome() {
    window.location.href = "index.html";
  }
  function navToAdminpanel() {
    window.location.href = "login.html";
  }
  function navToResturant() {
    window.location.href = "resturant.html";
  }
  
  
  localStorage.setItem("email", JSON.stringify("admin2007@gmail.com"));
  localStorage.setItem("password", JSON.stringify("admin2007"));
  
 
  let loginEmail = document.getElementById("loginEmail");
  let loginPass = document.getElementById("loginPass");
  

  let parsedEmail = JSON.parse(localStorage.getItem("email"));
  let parsedPass = JSON.parse(localStorage.getItem("password"));
  
  function loginMethod() {
    if (loginEmail.value !== "" && loginPass.value !== "") {
      if (loginEmail.value === parsedEmail && loginPass.value === parsedPass) {
        window.location.href = "adminPanel.html";
      } else {
        alert("Invalid Email Or Password");
      }
    } else {
      alert("Fill All The Requirements");
    }
  }
  
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loginMethod();
    }
  });
  
  
  let resturantLogo = document.getElementById("resturant-logo");
  let resturantName = document.getElementById("resturant-name");
  let resturantdescription = document.getElementById("resturant-description");
  

  let resturantList = [];
  let oldVal = localStorage.getItem("resturants");
  if (oldVal) {
    resturantList = JSON.parse(oldVal);
  }
  
  
  function addResturant() {
    let resturant = {
      name: resturantName.value,
      description: resturantdescription.value,
      logo: URL.createObjectURL(resturantLogo.files[0]),
      id: Date.now(),
    };
  
    resturantList.push(resturant);
    localStorage.setItem("resturants", JSON.stringify(resturantList));
  
    
    resturantName.value = "";
    resturantdescription.value = "";
    resturantLogo.value = null; 
  
    renderTable(); 
    renderRestaurantCards(); 
  }
  

  function renderTable() {
    let resturantTableBody = document.getElementById("resturantTableBody");
  
    if (!resturantTableBody) return; 
  
    resturantTableBody.innerHTML = resturantList
      .map(
        (resturant, index) => `
          <tr>
            <td><img src="${resturant.logo}" width="50" height="50" style="border-radius: 5px;"></td>
            <td>${resturant.name}</td>
            <td>${resturant.description}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteResturant(${index})">Delete</button>
            </td>
          </tr>
        `
      )
      .join("");
  }
  
  
  function deleteResturant(index) {
    resturantList.splice(index, 1);
    localStorage.setItem("resturants", JSON.stringify(resturantList));
    renderTable();
    renderRestaurantCards(); 
  }
  
  
  function renderRestaurantCards() {
    let restaurantListContainer = document.getElementById("restaurant-list");
  
    if (!restaurantListContainer) return; 
  
    restaurantListContainer.innerHTML = resturantList
      .map(
        (resturant) => `
        <div class="card m-2" style="width: 18rem">
          <img src="${resturant.logo}" class="card-img-top" alt="${resturant.name}" />
          <div class="card-body">
            <h5 class="card-title">${resturant.name}</h5>
            <p class="card-text">${resturant.description}</p>
            <a href="#" class="btn btn-primary">View Dishes</a>
          </div>
        </div>
      `
      )
      .join("");
  }
  
  
  window.onload = function () {
    renderTable(); 
    renderRestaurantCards(); 
  };
  // console.log(resturantList);
  // let nameOfResturant=document.getElementById('nameOfResturanr')
  // for(let i=0;i<resturantList.length;i++){
  //   nameOfResturant.innerHTML+= `<option value="">${resturantList[i].name}</option>`
    
  // }
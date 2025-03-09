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
//****************************** */
// I USED AI IN THE END TO OPTIMIZE THE CODE SO IT MAY LOOK A BIT DIFFICULT TO UNDERSTAND
//********************************************************************************** */ 
// Navigation Functions
function navTohome() {
  window.location.href = "index.html";
}

function navToAdminpanel() {
  window.location.href = "login.html";
}

function navToResturant() {
  window.location.href = "resturant.html";
}

// Store admin credentials
localStorage.setItem("email", JSON.stringify("admin2007@gmail.com"));
localStorage.setItem("password", JSON.stringify("admin2007"));

// Get login inputs
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");

// Retrieve admin credentials
let parsedEmail = JSON.parse(localStorage.getItem("email"));
let parsedPass = JSON.parse(localStorage.getItem("password"));

// Login function
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

// Enter key login event
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
      loginMethod();
  }
});

// Restaurant Data Management
let resturantList = JSON.parse(localStorage.getItem("resturants")) || [];

// Function to add a restaurant
function addResturant() {
  let resturantName = document.getElementById("resturant-name").value;
  let resturantDescription = document.getElementById("resturant-description").value;
  let resturantLogoInput = document.getElementById("resturant-logo");

  if (!resturantName || !resturantDescription || !resturantLogoInput.files.length) {
      alert("Please fill all fields");
      return;
  }

  let resturant = {
      id: Date.now(),
      name: resturantName,
      description: resturantDescription,
      logo: URL.createObjectURL(resturantLogoInput.files[0]),
  };

  resturantList.push(resturant);
  localStorage.setItem("resturants", JSON.stringify(resturantList));

  // Clear inputs
  document.getElementById("resturant-name").value = "";
  document.getElementById("resturant-description").value = "";
  document.getElementById("resturant-logo").value = "";

  renderTable();
  renderRestaurantCards();
}

// Function to render restaurant table
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

// Function to delete restaurant
function deleteResturant(index) {
  resturantList.splice(index, 1);
  localStorage.setItem("resturants", JSON.stringify(resturantList));
  renderTable();
  renderRestaurantCards();
}

// Function to render restaurant cards
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
          <button class="btn pink" onclick="viewDishes(${resturant.id})">View Dishes</button>
        </div>
      </div>
    `
      )
      .join("");
}

// Function to populate the restaurant dropdown dynamically
function populateRestaurantDropdown() {
  let nameOfRestaurant = document.getElementById("nameOfResturant");
  if (!nameOfRestaurant) return;

  nameOfRestaurant.innerHTML = '<option value="">Select Restaurant</option>';
  resturantList.forEach((resturant) => {
      let option = document.createElement("option");
      option.value = resturant.id;
      option.textContent = resturant.name;
      nameOfRestaurant.appendChild(option);
  });
}

// Function to add a dish to the selected restaurant
function addDish() {
  let selectedRestaurantId = document.getElementById("nameOfResturant").value;
  let dishName = document.getElementById("dish-name").value;
  let dishDescription = document.getElementById("dish-description").value;
  let dishLogoInput = document.getElementById("dish-logo");

  if (!selectedRestaurantId || !dishName || !dishDescription || !dishLogoInput.files.length) {
      alert("Please fill all fields and select a restaurant.");
      return;
  }

  let dishLogo = URL.createObjectURL(dishLogoInput.files[0]);
  let dishesList = JSON.parse(localStorage.getItem("dishes")) || {};

  if (!dishesList[selectedRestaurantId]) {
      dishesList[selectedRestaurantId] = [];
  }

  let dish = {
      name: dishName,
      description: dishDescription,
      logo: dishLogo,
  };

  dishesList[selectedRestaurantId].push(dish);
  localStorage.setItem("dishes", JSON.stringify(dishesList));

  // Clear inputs
  document.getElementById("dish-name").value = "";
  document.getElementById("dish-description").value = "";
  document.getElementById("dish-logo").value = "";

  alert("Dish added successfully!");
}

// Function to view dishes of a restaurant
// Function to view dishes of a restaurant
function viewDishes(restaurantId) {
  let dishesList = JSON.parse(localStorage.getItem("dishes")) || {};
  let dishes = dishesList[restaurantId] || [];

  let dishContainer = document.getElementById("dish-list");
  if (!dishContainer) {
      console.error("Dish container not found!");
      return;
  }

  if (dishes.length === 0) {
      dishContainer.innerHTML = `<p>No dishes available for this restaurant.</p>`;
      return;
  }

  dishContainer.innerHTML = dishes
      .map(
          (dish) => `
      <div class="card m-2" style="width: 18rem">
        <img src="${dish.logo}" class="card-img-top" alt="${dish.name}" />
        <div class="card-body">
          <h5 class="card-title">${dish.name}</h5>
          <p class="card-text">${dish.description}</p>
        </div>
      </div>
    `
      )
      .join("");
}


// Load restaurants into the dropdown when the page loads
window.onload = function () {
  renderTable();
  renderRestaurantCards();
  populateRestaurantDropdown();
};

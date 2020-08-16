// defines expenses and forecasts nodes

const expenses = document.querySelector('.expenses');
const forecasts = document.querySelector('.forecasts');

//defines empty arrays for doing sums on category's 

const sumArrayTot = [];
const sumArrayFood = [];
const sumArrayHouse = [];
const sumArrayTech = [];
const sumArrayHealth = [];
const sumArrayVehicle = [];
const sumArrayOther = [];
const sumArrayWhat = [];

const forecastArrayTot = [];
const forecastArrayFood = [];
const forecastArrayHouse = [];
const forecastArrayTech = [];
const forecastArrayHealth = [];
const forecastArrayVehicle = [];
const forecastArrayOther = [];
const forecastArrayWhat = [];

//setting initial values for sums to zero, also outside function so accessible for other functions
let i = 0;
let sumTot = 0;
let sumTot1 = 0;
let sumFood = 0;
let sumHouse = 0;
let sumTech = 0;
let sumHealth = 0;
let sumVehicle = 0;
let sumOther = 0;

let forecastTot = 0;
let forecastTot1 = 0;
let forecastFood = 0;
let forecastHouse = 0;
let forecastTech = 0;
let forecastHealth = 0;
let forecastVehicle = 0;
let forecastOther = 0;


//after dom loaded then initialises side menu's
document.addEventListener('DOMContentLoaded', function () {
  // update expense form
  const forms1 = document.querySelectorAll('.side-form1');
  M.Sidenav.init(forms1, { edge: 'left' });
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add expense form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });

  // add eForecast form
  const formsF1 = document.querySelectorAll('.side-form-F1');
  M.Sidenav.init(formsF1, { edge: 'left' });
  // New Forecast form
  const formsF2 = document.querySelectorAll('.side-form-F2');
  M.Sidenav.init(formsF2, { edge: 'left' });

});

//This renders sum EXPENSE  totals 
const renderExpensex = (data) => {

  //this takes sum(string), converts to number & then makes an array of all sums & then iterates through to get sumTotal
  const y = parseInt(data.sum);
  sumArrayTot.push(y);
  for (i = 0, sumTot1 = 0; i < sumArrayTot.length; sumTot1 += sumArrayTot[i++]);
  //iterate through transactions to find categories to get each category sum.
  if (data.category == 'Food-🍲') {
    sumArrayFood.push(y);
    for (i = 0, sumFood = 0; i < sumArrayFood.length; sumFood += sumArrayFood[i++]);
  } else if (data.category == 'House-🏠') {
    sumArrayHouse.push(y);
    for (i = 0, sumHouse = 0; i < sumArrayHouse.length; sumHouse += sumArrayHouse[i++]);
  } else if (data.category == "Tech-💾") {
    sumArrayTech.push(y);
    for (i = 0, sumTech = 0; i < sumArrayTech.length; sumTech += sumArrayTech[i++]);
  } else if (data.category == "Vehicle-🚙") {
    sumArrayVehicle.push(y);
    for (i = 0, sumVehicle = 0; i < sumArrayVehicle.length; sumVehicle += sumArrayVehicle[i++]);
  } else if (data.category == "Health-⚕️") {
    sumArrayHealth.push(y);
    for (i = 0, sumHealth = 0; i < sumArrayHealth.length; sumHealth += sumArrayHealth[i++]);
  }
  else if (data.category == "Other-🏺") {
    sumArrayOther.push(y);
    for (i = 0, sumOther = 0; i < sumArrayOther.length; sumOther += sumArrayOther[i++]);
     };
 
};

//This renders sum FORECAST  totals 
const renderForecastx = (data) => {

  //this takes forecast(string), converts to number & then makes an array of all forecasts & then iterates through to get forecastTotal
  const y = parseInt(data.sum);
  forecastArrayTot.push(y);
  for (i = 0, forecastTot1 = 0; i < forecastArrayTot.length; forecastTot1 += forecastArrayTot[i++]);
  //iterate through transactions to find categories to get each category forecast.
  if (data.category == 'Food-🍲') {
    forecastArrayFood.push(y);
    for (i = 0, forecastFood = 0; i < forecastArrayFood.length; forecastFood += forecastArrayFood[i++]);
  } else if (data.category == 'House-🏠') {
    forecastArrayHouse.push(y);
    for (i = 0, forecastHouse = 0; i < forecastArrayHouse.length; forecastHouse += forecastArrayHouse[i++]);
  } else if (data.category == "Tech-💾") {
    forecastArrayTech.push(y);
    for (i = 0, forecastTech = 0; i < forecastArrayTech.length; forecastTech += forecastArrayTech[i++]);
  } else if (data.category == "Vehicle-🚙") {
    forecastArrayVehicle.push(y);
    for (i = 0, forecastVehicle = 0; i < forecastArrayVehicle.length; forecastVehicle += forecastArrayVehicle[i++]);
  } else if (data.category == "Health-⚕️") {
    forecastArrayHealth.push(y);
    for (i = 0, forecastHealth = 0; i < forecastArrayHealth.length; forecastHealth += forecastArrayHealth[i++]);
  }
  else if (data.category == "Other-🏺") {
    forecastArrayOther.push(y);
    for (i = 0, forecastOther = 0; i < forecastArrayOther.length; forecastOther += forecastArrayOther[i++]);
    // } else if (data.category === "") {
    //   forecastArrayWhat.push(y);
    //   for (i = 0, forecastWhat = 0; i < forecastArrayWhat.length; forecastWhat += forecastArrayWhat[i++]);
  };
  //string literal output from collected forecastmed data above
  const htmly = `
  
          <div class="expense-details">
          
          <div >Total SPENT this month <strong>$${sumTot1}</strong></div>
        <div >Food-$${sumFood}/House-$${sumHouse}/Tech-$${sumTech}</br>
        Vehicle-$${sumVehicle}/Health-$${sumHealth}/Other-$${sumOther}</div>
        <hr>
        <div >Total BUDGET this month <strong>$${forecastTot1}</strong></div>
          <div >Food-$${forecastFood}/House-$${forecastHouse}/Tech-$${forecastTech}</br>
          Vehicle-$${forecastVehicle}/Health-$${forecastHealth}/Other-$${forecastOther}</div>
                    </div>
         <hr>
      `;

  // expenses.innerHTML = htmlx;
  expenses.innerHTML = htmly;
};

// render expense data
const renderExpense = (data, id) => {
  //this takes number object and converts to a string date to display.
  const x = data.date;
  const date1 = new Date(x).toLocaleDateString('en-GB');

  //Template for rendering to cards

  //// <dfn class="material-icons" data-id="${id}" data-target="side-form1">edit</dfn>  
  //// <a class="btn-floating btn-small waves-effect waves-light black"><i class="material-icons">edit</i></a>

  const html = `
    <div class="card-panel expense white row" data-id="${id}">

      <div class="expense-add">
      <dfn class="material-icons sidenav-trigger" data-target="side-form1" data-id="${id}">E</dfn>
       </div>
      
      <div class="expense-details">
        <div class="expense-sum">$${data.sum}</div>
          <div class="expense-other">${data.shop} / ${data.category} / ${data.billable}/ ${data.account}</br>
            ${data.comment}</br>
            ${date1}</br>
          </div>
            <div class="expense-delete">
             <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
       </div>
    </div>
  `;


  expenses.innerHTML += html;

};

// remove expense
const removeExpense = (id) => {
  const expense = document.querySelector(`.expense[data-id=${id}]`);
  expense.remove();

};

//FORECAST DATA

const renderForecast = (data, id) => {
  

  //Template for rendering to cards

 
  const htmlz = `
    <div class="card-panel expense orange lighten-5 row" data-id="${id}">

      <div class="forecast-add">
      <cite  data-id="${id}">P</cite>
       </div>
      <div class="forecast-details">
        <div class="forecast-sum"> $${data.sum}   / ${data.name} </div>
          <div class="forecast-other">${data.category} / ${data.month} / ${data.current}/ ${data.paid}</br>
    </div>
  `;

  expenses.innerHTML += htmlz;
  };

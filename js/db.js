// Initialize Firebase
var config = {
put your FIREBASE FIRTESTORE CONFIG DATA HERE
  apiKey: ",
  authDomain: 
  databaseURL: "
  projectId: 
  storageBucket:
  messagingSenderId: 
  appId: 

};
firebase.initializeApp(config);
const db = firebase.firestore();

// enable offline data
//if (process.browser) {}
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

//THIS RENDERS SUMS of all EXPENSES to top of page
db.collection('expenses').where("date", ">", 1596240000).orderBy('date', 'asc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderExpensex(change.doc.data());
  });
});

//THIS RENDERS SUMS of all FORECASTS to top of page
db.collection('forecasts').where("current", "==", "true").orderBy('order', 'asc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    renderForecastx(change.doc.data());
  });
});



//THIS renders Forecasts to PAGE
db.collection('forecasts').where("current", "==", "true").where("paid", "==", "false").orderBy('order', 'asc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {

    //if (change.type === 'added') {
    renderForecast(change.doc.data(), change.doc.id);
    console.log(snapshot.docChanges());
    // }
    // if (change.type === 'removed') {
    //   removeExpense('change'.doc.id);
    //   // console.log(snapshot.docChanges());
    // }

  });
});

//THIS renders Expenses to top ogf page
// real-time listener    where("date", ">", 1596766972959, 1596765700336,1596245186, 1596240000 )
db.collection('expenses').where("date", ">", 1596240000).orderBy('date', 'desc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {


    if (change.type === 'added') {
      renderExpense(change.doc.data(), change.doc.id);
      //console.log(snapshot.docChanges());
    }
    if (change.type === 'removed') {
      removeExpense('change'.doc.id);
      // console.log(snapshot.docChanges());
    }

  });
});





// add new expense
const form = document.querySelector('.add-expense');
form.addEventListener('submit', evt => {
  evt.preventDefault()

  const expense = {
    sum: form.sum.value,
    shop: form.shop.value,
    category: form.category.value,
    account: form.account.value,
    billable: form.billable.value,
    comment: form.comment.value,
    date: Date.now(),
  };


  db.collection('expenses').add(expense)
    .catch(err => console.log(err));
  form.sum.value = '';
  form.shop.value = '';
  form.category.value = '';
  form.account.value = '';
  form.billable.value = '';
  form.comment.value = '';

});
// remove a expense
const expenseContainer = document.querySelector('.expenses');
expenseContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {

    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('expenses').doc(id).delete();
  }
});
// UPDATE AN EXPENSE
//first click in the expense area- if it clicks on the edit icon then we want to open the edit form  
//after getting the doc details from the database, to display in the form for editing
const expenseContainer1 = document.querySelector('.expenses');
expenseContainer1.addEventListener('click', evt => {
  if (evt.target.tagName === 'DFN') {
    //if it clicks on the edit iconwithin the "dfn" tags 
    // then we want to open the edit form and populate it with existing data 
    const id = evt.target.getAttribute('data-id');
    console.log(id);

    db.collection('expenses').doc(id).get().then(function (doc) {
      if (doc.exists) {
        sum1.value = doc.data().sum;
        shop1.value = doc.data().shop;
        category1.value = doc.data().category;
        account1.value = doc.data().account;
        billable1.value = doc.data().billable;
        comment1.value = doc.data().comment;
        //date1.value = doc.data().date;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    // update expense
    const form1 = document.querySelector('.update-expense');
    form1.addEventListener('submit', evt => {
      evt.preventDefault()

      const expense1 = {
        sum: document.forms[1].sum1.value,
        shop: shop1.value,
        category: category1.value,
        account: account1.value,
        billable: billable1.value,
        comment: comment1.value,
      };

      db.collection('expenses').doc(id).update(expense1).catch(err => console.log(err));
      form1.sum1.value = '';
      form1.shop1.value = '';
      form1.category1.value = '';
      form1.account1.value = '';
      form1.billable1.value = '';
      form1.comment1.value = '';
    });
  }
});

//FORECASTING DATABASE- 

// add new forecast amount
const formf2 = document.querySelector('.add-forecast2');
formf2.addEventListener('submit', evt => {
  evt.preventDefault()

  const forecast = {
    sum: formf2.fsum.value,
    category: formf2.category.value,
    name: formf2.name.value,
    month: formf2.month.value,
    current: formf2.current.value,
    paid: formf2.paid.value,
    order: formf2.order.value,
  };

  db.collection('forecasts').add(forecast)
    .catch(err => console.log(err));
  formf2.fsum.value = '';
  formf2.name.value = '';
  formf2.category.value = '';
  formf2.month.value = '';
  formf2.current.value = '';
  formf2.paid.value = '';
  formf2.order.value = '';
});


// SWITCH FORECAST ITEM TO PAID
//first click in the expense area- if it clicks on the edit icon then we want to open the edit form  
//after getting the doc details from the database, to display in the form for editing
const forecastContainer = document.querySelector('.expenses');
forecastContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'CITE') {
    evt.preventDefault()
    //if it clicks on the edit icon within the "cite" tags 
    // then we want to open the edit form and populate it with existing data 
    const id = evt.target.getAttribute('data-id');


    //console.log(id);

    db.collection('forecasts').doc(id).get().then(function (doc) {
      if (doc.exists) {
        const forecastTrue = {
          paid: paid.value = "true",
        }
        db.collection('forecasts').doc(id).update(forecastTrue).catch(err => console.log(err));

        // shop1.value = doc.data().shop;
        // category1.value = doc.data().category;
        // account1.value = doc.data().account;
        // billable1.value = doc.data().billable;
        // comment1.value = doc.data().comment;
        // //date1.value = doc.data().date;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    // // update expense
    // const form1 = document.querySelector('.update-expense');
    // form1.addEventListener('submit', evt => {
    //   evt.preventDefault()

    //   const expense1 = {
    //     sum: document.forms[1].sum1.value,
    //     shop: shop1.value,
    //     category: category1.value,
    //     account: account1.value,
    //     billable: billable1.value,
    //     comment: comment1.value,
    //   };

    //   db.collection('expenses').doc(id).update(expense1).catch(err => console.log(err));
    //   form1.sum1.value = '';
    //   form1.shop1.value = '';
    //   form1.category1.value = '';
    //   form1.account1.value = '';
    //   form1.billable1.value = '';
    //   form1.comment1.value = '';
    // });
  }
});
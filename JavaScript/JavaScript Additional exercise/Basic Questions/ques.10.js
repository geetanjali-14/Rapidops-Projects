//Prototype 
function User(name, age) {
    this.name = name;
    this.age = age;
  }
  
  User.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
  const Geetanjali = new User('Geetanjali', 22);
  
  Geetanjali.greet();
  
  //Promise
  function getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data retrieved.');
      }, 2000);
    });
  }
  
  getData()
      .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
  
  //async and await
  async function processData() {
    try {
      const data = await getData();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  processData();
  
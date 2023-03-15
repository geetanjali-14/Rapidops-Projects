//using 3rd variable
number1=+prompt("Enter number-1 : ")
number2=+prompt("Enter number-2 : ")
// let temp;
// temp=number1;
// number1=number2;
// number2=temp;
// console.log(`number1: ${number1}`)
// console.log(`number2: ${number2}`)

//Without using third variable
number1=number1+number2
number2=number1-number2
number1=number1-number2;
console.log(`number1: ${number1}`)
console.log(`number2: ${number2}`)
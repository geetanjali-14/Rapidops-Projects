let number=prompt("Enter a number: ");
let number_length=number.length;
// console.log(number_length)
let sum=0;
let temp=number
while(temp>0)
{
   let remainder=temp%10;
    sum += remainder **number_length;
   temp = parseInt(temp / 10);
}
if(sum==number)
console.log(`${number} is an armstrong number.`)
else
console.log(`${number} is not armstrong number.`)
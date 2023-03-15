
function prime(number)
{
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}
let number=prompt("Enter a number: ");
if(number==1|number==0)
console.log(`${number} is neither prime nor composite number`)
else
{
    let ans=prime(number);
// console.log(ans)
if(ans==true)
console.log(`${number} is a Prime number.`)
else
console.log(`${number} is not Prime number.`)
}
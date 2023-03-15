function palindrome(number)
{
    let Reverse_number=0;
    while(number>0)
    {
        let remainder=number%10;
        Reverse_number=remainder+Reverse_number*10;
        number = parseInt(number / 10);
    }
    return Reverse_number;
}
let number=prompt("Enter a number: ");
if(number>0)
{
    let reverse_number=palindrome(number);
console.log(`${reverse_number} is reverse of ${number}.`)
}
else
{
    console.log("Please enter a positive number.")
}

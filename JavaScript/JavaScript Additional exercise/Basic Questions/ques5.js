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
    let sum=palindrome(number);
    if(sum==number)
    console.log(`${number} is an Palindrome number.`)
    else
    console.log(`${number} is not Palindrome number.`)
}
    else
    {
        console.log("Please enter a positive number.")
    }    
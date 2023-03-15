function factorial(number){
    if(number < 0){
        console.log("Please enter a positive number.")
        return false
    }
    if(number == 0 || number == 1){
        return 1;
    }else{
        return number * factorial(number-1);
    }
}
let number=prompt("Enter a number: ");
answer = factorial(number)
if(answer>0)
console.log("Factorial of " + number + " : " + answer);

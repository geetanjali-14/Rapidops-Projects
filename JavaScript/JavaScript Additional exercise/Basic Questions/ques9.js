//Tail recursion
function func1(number)
{
    if(number>0)
    {
        console.log("number\n")
        func1(number-1);
    }
}  
let number1=4;
func1(number)
         
//Head recursion
function func2(number)
{
    if(number>0)
    {
        func2(number-1);
        console.log(number)
    }
}  
let number2=4;
func2(number)

//Tree recursion
function func3(number)
{
    if(number>0)
    {
        console.log(number)
        func3(number-1);
        func3(number-1);
    }
}  
let number3=4;
func3(number3)

//Indirect recursion
function func_A(number)
{
    if(number>0)
    {
        console.log("Inside function-A: "+number)
        func_B(number-1);
    }
} 
function func_B(number)
{
    if(number>0)
    {
        console.log("Inside function-B: "+number)
        func_A(number-1);
    }
} 
let number4=4;
func_A(number4)
         
//Nested recursion
function func5(number)
{
    if(number>100)
    {
        return number-10;
    }
    else
    {
        return func5(func5(number+11));
    }
} 
let number5=90;
console.log(func5(number5))
         
         
         
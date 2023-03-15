function fibonacci(number){
    let a=0,b=1;
    console.log(a+" "+b);
    while(number>2)
    {
        let num=a+b
        console.log(num)
        a=b;
        b=num;
        number--;
    }
}
let number=prompt("Enter a number: ");
if(number==1)
console.log("0")
else if(number==2)
console.log("0"+" "+"1")
else
fibonacci(number)

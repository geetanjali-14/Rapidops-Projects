// Pattern - 1 

function pattern1() {
    n= prompt("Enter number of Rows");
    let pattern1="";
    for (let i=1;i<=n;i++)
    {
        for(let j=1;j<=n;j++)
        {
            if(j==i||j==n-i+1)
            pattern1 +="*";
            else
            pattern1 +="&nbsp&nbsp";
        }
        pattern1 +="<br\>";
    }
    document.write(pattern1); 
   }


// Pattern - 2 
function pattern2() {
n= prompt("Enter number of Rows: ");
let pattern2="";
for (let i=1;i<=n;i++)
{
    for(let j=1;j<=n;j++)
    {
        if(j==n||i==n||j==1||i==1)
        pattern2 +="* ";
        else
        pattern2 +="&nbsp&nbsp&nbsp";
    }
    pattern2 +="<br/>";
}
document.write(pattern2);
}

// Pattern - 3 
function pattern3() {
    n= prompt("Enter number of Rows: ");
    let pattern3="";
    for (let i=1;i<=n;i++)
    {
        for(let j=1;j<=n-i;j++)
        {
            pattern3 +="&nbsp";
           
        }
        for(let k=1;k<=(2*i)-1;k++)
        {
            if(k==1||k==(2*i)-1)
            pattern3 +="*";
            else
            pattern3+="&nbsp";
        }
        pattern3 +="<br/>";
    }
    for (let i=n-1;i>=1;i--)
    {
        for(let j=1;j<=n-i;j++)
        {
            pattern3 +="&nbsp";
        }
        for(let k=1;k<=(2*i)-1;k++)
        {
            if(k==1||k==(2*i)-1)
            pattern3 +="*";
            else
            pattern3+="&nbsp";
        }
         pattern3 +="<br/>";
    }
    document.write(pattern3);
    }

    

// Pattern - 4
function pattern4() {
n= prompt("Enter number of Rows: ");
let pattern4="";
for (let i=1;i<n;i++)
{
    for(let j=1;j<i;j++)
    {
        pattern4+="*";
    }
    pattern4 +="<br/>";
}
for(let i=1;i<n;i++)
{
    for(let j=n-2;j>i;j--)
    {
        pattern4+="*";
    }
    pattern4 +="<br/>";
}
document.write(pattern4);
}


// Pattern-5 

function pattern5() {
n= prompt("Enter number of Rows: ");
let pattern5="";
for (let i=1;i<n;i++)
{
    for(let j=1;j<i;j++)
    {
        pattern5+="&nbsp&nbsp";
    }
    for(let k=i;k<=n;k++)
    pattern5 += (k+"&nbsp&nbsp");
    
    pattern5 +="<br/>";
}

for (let i=n;i>=1;i--)
{
    for(let j=i;j>1;j--)
    {
        pattern5+="&nbsp&nbsp";
    }
    for(let k=i;k<=n;k++)
    pattern5 += (k+"&nbsp&nbsp");
    
    pattern5 +="<br/>";
}
document.write(pattern5);
}
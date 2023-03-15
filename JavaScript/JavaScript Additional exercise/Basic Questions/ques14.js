let array=[
    {
    name:'Geetanjali',
    id:1,
    college:"SATI"
    },
    {
    name:'Nishi',
    id:2,
    college:"SIRT"
    },
    {
    name:'Ritika',
    id:3,
    college:"MITS"
    }
]

array.forEach(ele=>
{
console.log("Name: ",ele.name)
console.log("College: ",ele.college)
})        

console.log(array[0])
console.log(array.constructor)

const  names= array.filter(array => array.id <= 2);
console.log(names); 

const college_name = array.map(array => array.college);
console.log(college_name); 


const sumOfId = array.reduce((sum, array) => sum + array.id, 0);
console.log(sumOfId); 


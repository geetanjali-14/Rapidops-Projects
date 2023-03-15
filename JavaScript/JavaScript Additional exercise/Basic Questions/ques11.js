let places=['Gaujrat','Delhi','Bhopal','Lucknow','Maharashtra','Rajasthan']
//Method to convert Array to string
console.log(places.toString());

//Mehod to join all elements of array into stirng
console.log(places.join(" - "));
console.log(places.join(" : "));

//Push Method to add one element in the array
places.push('Kerala')
console.log("Modified array- places:",places)

//Pop Method to remove last element in the array
console.log("popped element : ",places.pop())
console.log("Modified array- places:",places)

//Shift Method to remov first element from the array
console.log("Removed 1st element : ",places.shift())
console.log("Modified array- places:",places)

//Unshift Method to adds given element at first place in the array
console.log("Length of places array after unshift: ",places.unshift("Kerala"))
console.log("Modified array- places:",places)

//Accessing array element
console.log("Element at index 3: ",places[2])

//Modifying array element at given index
places[4]='Inodre';
console.log(places);

//appeding new element in array without push
places[places.length]='Goa';
console.log(places);

//Concatinating two arrays
animal=['lion','elephant','deer','giraffe','tiger']
bird=['sparrow','parrot','peacock','crow']
console.log(animal.concat(bird))

//splice method for adding new element in array without removing array elements
places.splice(2,0,"Jammu","Assam")
console.log(places);

//splice method for adding new element in array by removing 2 array elements
places.splice(2,2,"Jaipur")
console.log(places);

//Slice method to get array element
console.log(places.slice(3))
console.log(places.slice(3,5))
console.log(places.slice(-1))

//Sorting an array
console.log("Sorted array: ",places.sort());

//Reversing an array
console.log("Reversed array: ",places.reverse());
let str="This is my Stirng-1"
console.log("Length of string: ",str.length)

console.log(str.slice(4,12))
console.log(str.slice(-12, -6));

console.log(str.substr(7,15))

console.log(str.substring(9))

console.log(str.replace("my","a"))
console.log("Original string after replace: ",str)

str2="The is is my is string-2"
console.log("Original string: ",str2," Replaced string: ",str2.replace("is","a"))
console.log("Original string: ",str2," Replaced string globally: ",str2.replace(/is/g,"a"))
console.log("Original string: ",str2," Replaced string case sensitively: ",str2.replace(/Is/i,"a"))

// console.log(str2.replaceAll("is","are"))

console.log(str2.toLowerCase())
console.log(str2.toUpperCase())

console.log(str.concat(" "+str2))

str3="    Hello World    ";
console.log(str3.trimStart())
console.log(str3.trimEnd());
console.log(str3.trim());

console.log(str3.charAt(6))
console.log(str3.charCodeAt(7))

console.log(str3[8])

console.log(str.split(""))
console.log(str.split(" "))
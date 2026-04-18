var args = process.argv;
var even = 0;
var odd = 0;
for(var i = 2; i < args.length; i++) {
    var num = parseInt(args[i]);

    if(num % 2 == 0)
        even++;
    else
        odd++;
}
console.log("Even Count: " + even);
console.log("Odd Count: " + odd);

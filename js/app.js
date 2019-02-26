$(document).ready(function(){
	const luhn = (cardNumber) => !(cardNumber.split('').map((char, index) => {
    const digit = parseInt(char);

    if ((index + cardNumber.length) % 2 === 0) {
        const digitX2 = digit * 2;

        return digitX2 > 9 ? digitX2 - 9 : digitX2;
    }
    return digit;
}).reduce((a, b) => a + b, 0) % 10);

    function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
    function generate(number){
    	var temp = number;
    	if (temp.charAt(0)=='x') temp=temp.replaceAt(0, randomInteger(4,5).toString());
    	 for (let i = 1;i<16;i++){
    	 	if (number.charAt(i)=='x') 
    	 	 {
    	 	 	temp=temp.replaceAt(i,randomInteger(0, 9).toString());
    	 	 }
    	 	}
    	 	if (!luhn(temp)) {return generate(number)} else {return temp;};
    }  
    $("#button").click(function(){
    	let arr = [];
    	try{
    	 var number = $("#numb").val();
    	 if (number == '') number='xxxxxxxxxxxxxxxx';
    	 if (number.length!=16) throw(Error);
    	  if ((number.charAt(0)!='4')&&(number.charAt(0)!='5')&&(number.charAt(0)!='x')) throw(Error);
    	 for (let i = 1;i<16;i++){
    	 	if ((number.charAt(i)!='x') && (isNaN(number.charAt(i)))){
    	 		throw(Error);
    	 	}
    	 }
    	 var output ='';
    		 for (let i = 0;i<$('#amount').val();i++)arr.push(generate(number));
    		 	for(var string in arr){
    		 		output+=arr[string];
    		 		if ($('input[id=expdat]').prop('checked'))
    		 		 {
    		 		 	output+= ' | ';
    		 		 	var expdat =randomInteger(1,12).toString();
    		 		 	if (expdat.length==1) expdat = '0' + expdat;
    		 		 	output+= expdat;
    		 		 	output+='/';
    		 		 	output+=randomInteger(2019,2022).toString();
    		 		 };
    		 		 if ($('input[id=ccv]').prop('checked'))
    		 		 {
    		 		 	output+= ' | ';
    		 		 	var ccvi = randomInteger(0,999).toString();
    		 		 	if (ccvi.length==1) ccvi ='00'+ccvi;
    		 		 	if (ccvi.length==2) ccvi ='0'+ccvi;
    		 		 	output+= ccvi;

    		 		 };
    		 		 arr[string]+=' | ';
    		 		 if  (arr[string].charAt(0) == 4) output+= ' | Visa';
    		 		 if  (arr[string].charAt(0) == 5) output+= ' | MasterCard';
    		 		output+='&#13;&#10;';
    		 		
    		 	}
    		 	$('.textarea').html(output);
    	 }
    	 catch(e){alert('Wrong number');}
    })
    document.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("button").click();
  }
});
});
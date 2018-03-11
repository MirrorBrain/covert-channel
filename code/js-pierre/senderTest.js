/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-19T15:57:29+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-23T18:11:35+01:00
 */



var threshold = .0015;
//taille de 8M0
var buffer_size = 1024 * 8192;
var line_length =Math.pow(2,);
var current;
var probe_buffer = new ArrayBuffer(buffer_size);
var prime_buffer = new ArrayBuffer(buffer_size);
var probe_view = new DataView(probe_buffer);
var prime_view = new DataView(prime_buffer);
var iteration = 10000;
var x = 0;
var treeshold = 8;

function probe()
{
for (var j = 0; j < ((buffer_size) / line_length); j++) {
  current = probe_view.getUint32(j * line_length);
}
}

function prime()
{
    current = probe_view.getUint32(0);
  }
var tableauBits = ['0','0','0','1','1','1','0','1','0','0','1','0','0','1','1','0','1','1','1','1','0','0','0','0','1','0','1','1','0','0','1','0','1','1','0','0','0','1','1','1'];




   function envoyerBits(tableau,index)
   {

       if(tableau[index] === "0")
       {
         prime();
       }
       else {
           probe();      //     console.log("temps pour probe = "  + diffTime4);
         }
       }
for(var i = 0;i <tableauBits.length;i++){

envoyerBits(tableauBits,i);
var startTime1 = window.performance.now();

  current =  prime_view.getUint32(x);

  diffTime1 = window.performance.now() - startTime1;
  var resultat;
  if(diffTime1 *10000 < treeshold)
  {
    resultat = '0';
  }
  else {
    {
      resultat ='1';
    }
  }
  console.log("test   " + diffTime1 *10000 + " x = " + tableauBits[i] + "avec resultat = " + resultat);

}

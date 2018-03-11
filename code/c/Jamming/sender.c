/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-12T14:38:52+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-13T14:13:34+01:00
 */
 #include <stdint.h>
 #include <stdlib.h>


/*
Algorithme récupèrer ici : https://cmaurice.fr/pdf/ndss17_maurice.pdf
Algorithm 2
*/

 void sendOne(int nb_ways,int *adress)
 {
   for(int i = 0; i< nb_ways -1;i++)
   {
     *adress[i];
     *adress[i +1];
     *adress[i];
     *adress[i+1];
   }
 }


void viderCache(uint64_t *tableau)
{

}

int memeSet(uint16_t element, uint16_t candidat)
{

  //On vide le cache

  //On fait un  acces a element

  //Puis acces au candidat


  //Si time(candidat) > treeshold alors peut-être même sets

}

void creeTableauMemeSlide(uint16_t *t)
{

}

/*
On fait un tableau qui va contenir les evictions sets
*/
 void test(config *c)
 {


 }

/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-12T16:53:01+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-13T11:47:33+01:00
 */

 #include <stdlib.h>
 #include <stdio.h>
 #include "cacheSet.h"



 void initialiserStructure(int taille,CachesetStruct cache)
 {
   cache.cacheAdresse = malloc(taille * sizeof(uint64_t));
   cache.taille = taille;
 }


void rajouterUneAdresse(CachesetStruct cache,uint64_t addr)
{
    uint64_t *cacheAdresse = malloc((cache.taille + 1) * sizeof(uint64_t));
    int i =0;
    for(i = 0 ; i< cache.taille ; i++)
    {
      cacheAdresse[i] = cache.cacheAdresse[i];
    }
    cacheAdresse[cache.taille] = addr;
    free(cache.cacheAdresse);
    cache.taille = cache.taille + 1;
    cache.cacheAdresse = cacheAdresse;
}



void afficherCache(CachesetStruct cache)
{
  for(int i = 0;i < cache.taille;i++)
  {
    printf("Pour le cache id = %d, valeur de l'adresse : %p",i,cache.cacheAdresse[i] );
  }
}

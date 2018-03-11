/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-12T16:35:12+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-12T19:18:34+01:00
 */

 #include <stdio.h>
 #include <stdint.h>


typedef struct
{
    int taille;
    uint64_t *cacheAdresse;
}CachesetStruct;

void initialiserStructure(int taille,CachesetStruct cache);
void rajouterUneAdresse(CachesetStruct cache,uint64_t addr);
void afficherCache(CachesetStruct cache);

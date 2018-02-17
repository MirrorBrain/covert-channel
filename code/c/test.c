/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-09T17:03:39+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-09T17:45:54+01:00
 */



#include <stdio.h>
#include <stdint.h>
#include <x86intrin.h> /* Pour rdtsc, rdtscp */
#include <sys/time.h>
struct timespec start, end;
#define CLOCK_MONOTONIC_RAW     4


int delta = 3;


void initialiseArray(uint64_t  *tableau, int taille)
{
  for(int i = 0; i < taille; i++)
  {

    tableau[i] = i * 64;
    //printf("tableau de %d = %d\n",i,tableau[i] );
  }
}


void prime(uint64_t element , uint64_t el)
{
  uint64_t t;
  //On fait un acces mêmoire au premier element
  clock_gettime(CLOCK_MONOTONIC_RAW, &start);
  t = element;
  clock_gettime(CLOCK_MONOTONIC_RAW, &end);
  //On print le temps
  uint64_t delta_us = (end.tv_sec - start.tv_sec) * 1000000 + (end.tv_nsec - start.tv_nsec) / 1000;

}

uint64_t getTimeAccesBetweenTwoData(uint64_t elment, uint64_t el2)
{
  uint64_t t;
  t = elment;
  clock_gettime(CLOCK_MONOTONIC_RAW, &start);
  t = el2;
  clock_gettime(CLOCK_MONOTONIC_RAW, &end);
  uint64_t delta_us = (end.tv_sec - start.tv_sec) * 1000000 + (end.tv_nsec - start.tv_nsec) / 1000;
  return delta_us;

}


void primeList(uint64_t *element,uint64_t *tableau,long taille)
{
  uint64_t t;
  for(long i = 1;i< taille;i++)
  {
      t = getTimeAccesBetweenTwoData(element,tableau[i]);
      if(t > 2)
      {
        printf("trouve avec i = %d et t = %d " , i,t);
      }
  }
}
void affichageTableauIndex(uint64_t *t, int index)
{
  printf("Affichage du tableau a l'index : [%d] =  %d  ",index,t[index]);
}


int main()
{
  long tailleBuffer = 1024*8192;
  uint64_t* tableau = malloc (1024*8192 * sizeof (uint64_t));
  printf("taille buffer = %d \n",tailleBuffer);
  initialiseArray(tableau,tailleBuffer);
  primeList(tableau[0],tableau,tailleBuffer);
  //affichageTableauIndex(tableau,10);

}
//On initialise le tableau

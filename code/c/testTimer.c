/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-09T14:42:12+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-09T14:45:44+01:00

  Fichier de test pour le timer en c
  
 */



#define D_POSIX_C_SOURCE = 199309L
#include <stdio.h>
#include <stdint.h>
#include <sys/time.h>
struct timespec start, end;
#define CLOCK_MONOTONIC_RAW     4
int doQquechose()
{
  int j;
  int toto;
  for(j=0;j<50000;j++)
  {
    toto = j * 95959 +257 << 3;
  }
}



int main()
{

  clock_gettime(CLOCK_MONOTONIC_RAW, &start);
  doQquechose();
  clock_gettime(CLOCK_MONOTONIC_RAW, &end);

  uint64_t delta_us = (end.tv_sec - start.tv_sec) * 1000000 + (end.tv_nsec - start.tv_nsec) / 1000;

  printf("le temps est de : %d" ,delta_us);


  clock_gettime(CLOCK_MONOTONIC_RAW, &start);
  clock_gettime(CLOCK_MONOTONIC_RAW, &end);
 delta_us = (end.tv_sec - start.tv_sec) * 1000000 + (end.tv_nsec - start.tv_nsec) / 1000;
 printf("le temps  2  est de : %d" ,delta_us);

}

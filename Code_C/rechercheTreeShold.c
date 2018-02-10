/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-09T17:46:07+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-09T18:53:25+01:00


 Ce programme permet de récupèrer les différents temps des accés
 Algorithme : Prime+probeBuffer
 Sortie : fichier csv
 */

 #include <stdio.h>
 #include <stdint.h>
 #include <x86intrin.h> /* Pour rdtsc, rdtscp */
 #include <sys/time.h>
 struct timespec start, end;
 #define CLOCK_MONOTONIC_RAW 4


#define line 64
#define  tailleBuffer 1024*8192
#define tour 5000


int ecrireDansUnFichier(char *namefichier,uint64_t *tableauUn, uint64_t *tableauDeux)
{
  FILE* fichier = NULL;

 fichier = fopen(namefichier, "w");

 if (fichier != NULL)
 {
   fprintf(fichier,"temps(ns) flushed; temps(ns) unflushed \n");
    for(int i = 0;i< tour;i++)
    {
      //printf("affichage final tour = %d , resultat = %d \n",i,tableauUn[i]);
      fprintf(fichier,"%d;%d\n",tableauUn[i],tableauDeux[i]);
    }
     fclose(fichier);
 }
 else{
   printf("Erreur d'ouverture du fichier\n" );
 }

 return 0;
}

int primeProbe(uint64_t *tableau,uint64_t *tableauFlushed, uint64_t *tableauUnflushed)
{
  uint64_t elemnt;
  uint64_t current = 0;
  for(int nbr = 0 ; nbr < tour ; nbr++)
  {
    for (int i = 0; i < (tailleBuffer / line ); i++) {
        current = tableau[i * line];
    }
    clock_gettime(CLOCK_MONOTONIC_RAW, &start);
    current = tableau[1];
    clock_gettime(CLOCK_MONOTONIC_RAW, &end);

    uint64_t delta_us =  (end.tv_nsec - start.tv_nsec) ;

  //  printf("le temps flushed est de : %d \n" ,delta_us);
    tableauFlushed[nbr] = delta_us;


    //On réaccede
    clock_gettime(CLOCK_MONOTONIC_RAW, &start);
    current = tableau[1];
    clock_gettime(CLOCK_MONOTONIC_RAW, &end);

   delta_us = (end.tv_nsec - start.tv_nsec) ;
    tableauUnflushed[nbr] = delta_us;
    //printf("le temps unflushed est de : %d \n" ,delta_us);
  //  printf("affichage du tableau  = %d ", tableauUnflushed[nbr]);
  }
}

 int main()
 {
   char * fichier ="sortie.csv";
   printf("Debut du programme \n");
   //On declare un buffer de 8M0 e
   uint64_t* tableau = malloc (tailleBuffer * sizeof (uint64_t));

   //On initalise les tableaux contenant les timers de retour
   uint64_t *tableauFlushed = malloc (tour * sizeof (uint64_t));
    uint64_t *tableauUnflushed = malloc (tour * sizeof (uint64_t));
   primeProbe(tableau,tableauFlushed,tableauUnflushed);
   ecrireDansUnFichier(fichier,tableauFlushed,tableauUnflushed);
   printf("Fin du programme, fichier de sortie %s \n",fichier);
 }

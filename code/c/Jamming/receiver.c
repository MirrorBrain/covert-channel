/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-12T14:38:43+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-12T16:20:44+01:00
 */
#include <stdint.h>
#include <stdlib.h>
#include "config.h"


void receive(config *c)
{
  uint8_t setRecue = 0;
  uint16_t recue = 0;
  uint16_t *sets = calloc(32 * c->cacheSlice,sizeof(uint16_t));


//Tant que le nombre de set !=  6
while (setRecue != 6) {
  for (int i = 0; i < 32 * c->cacheSlice; i++) {
    



}


}
}

#include <stdio.h>
#include <stdint.h>
#include <x86intrin.h> /* Pour rdtsc, rdtscp */

#define ITERATIONS		2048
#define STRIDE			8192
#define OFFSET			64

uint8_t evictionBuffer[STRIDE * ITERATIONS];
uint8_t probeBuffer[STRIDE * ITERATIONS];

typedef enum { OK, BAD_PARAMETER } error_t;

void prime_cache() {
}

void purgeCache(uint16_t *temp) {
    for (uint32_t i = 0; i < ((STRIDE * ITERATIONS) / OFFSET); i++)
        *temp = evictionBuffer[i * OFFSET];
}

int main() {
    error_t ret = BAD_PARAMETER;

    uint16_t rounds = 1000;

    uint16_t temp = 0;

    uint64_t	timeFlushed		= 0;
    uint64_t	timeUnflushed	= 0;

    register uint64_t timeBefore, timeRAM, timeCache;

    for (uint16_t round = 0; round < rounds; round++) {
        /* On purge le cache */
        purgeCache(&temp);

        /* Premier accès depuis la RAM */
        _mm_mfence();
        timeBefore = __rdtsc();
        _mm_mfence();

        temp = probeBuffer[1];         // 1 est la page

        _mm_mfence();
        timeRAM = __rdtsc() - timeBefore;
        _mm_mfence();

        /* Second accès depuis le cache L3 */
        _mm_mfence();
        timeBefore = __rdtsc();
        _mm_mfence();

        temp = probeBuffer[1];         // 1 est la page

        _mm_mfence();
        timeCache = __rdtsc() - timeBefore;
        _mm_mfence();

        /* On purge le cache encore une fois */
        purgeCache(&temp);

        timeFlushed		+= timeRAM;
        timeUnflushed	+= timeCache;
    }

    printf("timeFlushed:   %lu\n", timeFlushed / rounds);
    printf("timeUnflushed: %lu\n", timeUnflushed / rounds);

    return ret;
}

//       _mm_mfence();
//       time1 = __rdtsc(); /* READ TIMER */
//       _mm_mfence();
//       junk = * addr; /* MEMORY ACCESS TO TIME */
//       _mm_mfence();
//       time2 = __rdtsc() - time1; /* READ TIMER & COMPUTE ELAPSED TIME */
//       _mm_mfence();

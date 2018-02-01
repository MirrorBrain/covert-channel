CC	:= gcc
CFLAGS	:= -Wall -pedantic -std=c11 -O3

poc-alexis: poc-alexis.c
	$(CC) $(CFLAGS) -o $@ $^

main: poc-alexis

.PHONY: clean

clean:
	rm -f poc *~

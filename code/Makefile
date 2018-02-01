CC	:= gcc
CFLAGS	:= -Wall -pedantic -std=c11 

POC: POC.c
	$(CC) $(CFLAGS) -o $@ $^

main: POC


.PHONY: clean

clean:
	rm -f POC *~

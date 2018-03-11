# @Author: Ribault Pierre <cawo>
# @Date:   2018-02-12T17:10:31+01:00
# @Email:  me@ribaultpierre.fr
# @Last modified by:   cawo
# @Last modified time: 2018-02-12T17:15:09+01:00


all: app

app: test.o cacheSet.o
	gcc -o app test.o cacheSet.o

CacheSet.o: cacheSet.c
	gcc -o cacheSet.o -c cachetSet.c

test.o: test.c cacheSet.h
	gcc -o test.o -c test.c

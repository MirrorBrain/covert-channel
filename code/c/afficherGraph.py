# @Author: Ribault Pierre <cawo>
# @Date:   2018-02-09T18:55:56+01:00
# @Email:  me@ribaultpierre.fr
# @Last modified by:   cawo
# @Last modified time: 2018-02-12T14:23:53+01:00

import numpy as np
import csv
import numpy
import matplotlib.pyplot as plt
import plotly.plotly as py  # tools to communicate with Plotly's server
import pylab as P



def tableauTrier(tabl):
    tab= []
    maxTableau = np.amax(tabl)
    print("maximum du tableau = " + str(maxTableau))


dataUnflushed = []
dataFlushed = []
with open('sortie.csv') as csvfile:
    iteration = 0
    reader =csv.reader(csvfile,delimiter=";")
    for row in reader:
        if(iteration != 0):
            dataFlushed.append(row[0])
            dataUnflushed.append(row[1])
        iteration = iteration +1



dataUnflushed.sort()
dataFlushed.sort()
del dataUnflushed[len(dataUnflushed) - 1]
del dataFlushed[len(dataFlushed) -1]

dataUnflushed = list(map(int, dataUnflushed))

dataFlushed = list(map(int, dataFlushed))
a = np.array(dataFlushed)
b = np.array(dataUnflushed)
np.sort(a)
np.sort(b)
dataFlushed.sort()

for dat in dataFlushed:
    print("x = " + str(dat) + " avec comme type = " + str(type(dat)))
#bins = numpy.linspace(0, 30, 1000)
#plt.hist(dataFlushed,bins)
#plt.hist(dataUnflushed,bins)
#plt.hist(a, bins,label="flushed", alpha=0.5)
#plt.hist(b, bins,label="flushed", alpha=0.5)

#plt.hist(dataUnflushed, bins,label="unflushed", alpha=0.5)
#plt.show()
#plot_url = py.plot_mpl(histogram, filename='docs/histogram-mpl-same')**

print("tableau = " + str(dataFlushed))
#tableauTrier(a)
"""
P.figure()
w0 = np.ones_like(x0)
w0[:len(x0)/2] = 0.5
w1 = np.ones_like(x1)
n, bins, patches = P.hist( [a,b], 10,histtype='bar')

P.show()

dataUnflushed.sort()
dataFlushed.sort()
"""
bins = [x for x in range(100,1500)]
del dataUnflushed[len(dataUnflushed) - 1]
del dataFlushed[len(dataFlushed) -1]
#plt.figure()
plt.hist(dataUnflushed,bins = bins, color= 'yellow',edgecolor ='yellow' ,label='unflushed')
plt.hist(dataFlushed,bins = bins, color= 'red',edgecolor ='red' ,label='flushed')
plt.ylabel('nombres')
plt.xlabel('temps')
plt.legend()
plt.show()
"""
n, bins, patches = P.hist(a, bins, histtype='bar',
                            color=['crimson'],
                            label=['Crimson'])
n, bins, patches = P.hist(b, bins, histtype='bar', stacked=True,color=['yellow'],label=['yellow'])
"""

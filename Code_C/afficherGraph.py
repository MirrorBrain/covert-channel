# @Author: Ribault Pierre <cawo>
# @Date:   2018-02-09T18:55:56+01:00
# @Email:  me@ribaultpierre.fr
# @Last modified by:   cawo
# @Last modified time: 2018-02-09T22:53:32+01:00

import numpy as np
import csv
import numpy
import matplotlib.pyplot as plt
import plotly.plotly as py  # tools to communicate with Plotly's server



dataUnflushed = []
dataFlushed = []
with open('sortie.csv') as csvfile:
    reader =csv.reader(csvfile,delimiter=";")
    for row in reader:
        dataFlushed.append(row[0])
        dataUnflushed.append(row[1])


histogram=plt.figure()


a = np.array(dataFlushed)
b = np.array(dataUnflushed)

bins = numpy.linspace(0, 800, 2500)
#plt.hist(dataFlushed,bins)
#plt.hist(dataUnflushed,bins)
plt.hist((a,b), bins,label="flushed", alpha=0.5)
#plt.hist(dataUnflushed, bins,label="unflushed", alpha=0.5)
plt.show()
plot_url = py.plot_mpl(histogram, filename='docs/histogram-mpl-same')

import csv
import sys



fd = open("../js/db01.js", "r")
x=fd.readline()
x=fd.readline()

i=0
while(x.rfind(']') < 5):
	y = eval(eval(x[0:x.rfind('}')+1] + "'"))
	print(y['ID'])
	i += 1
	x=fd.readline()

y = eval(eval(x[0:x.rfind('}')-1] + "'"))
print(y['ID'])
fd.close()
print (i)

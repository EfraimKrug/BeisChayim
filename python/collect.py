import os
import sys

idxs = []
newidxs = []

countNew = 0
countOld = 0

masterfile = '/home/efraim/bcCode/BeisChayim/js/db01.js'
path = '/home/efraim/bcCode/BeisChayim/data/'

for filename in os.listdir(path):
    # new files - numbers start with 'New'
    #print filename[0:9]
    if filename[0:9] == "$$BC$$New":
        with open(path + filename) as fl:
            for line in fl:
                newidxs.append(["00" + line[11:line.find("\"", 9)], line])
    else:
        if filename[0:6] == "$$BC$$":
            with open(path + filename) as fl:
                for line in fl:
                    idxs.append([line[8:line.find("\"", 8)], line])

#for i in newidxs:
#    print(i)

with open(masterfile) as mfl:
    newPrinted = 0

    for line in mfl:
        idx = line[8:line.find("\"", 8)]
        pSw = 0
        for e in idxs:
            if idx == e[0]:
                print (e[1])
                pSw = 1
                countNew = countNew + 1
        if pSw == 0:
            print (line),
            countOld = countOld + 1

        pSw = 0

        if newPrinted < 1 and countOld > 10:
            for d in newidxs:
                print (d[1])
                countNew = countNew + 1
            newPrinted = 1


#print ("New: " + str(countNew) + "; Old: " + str(countOld))

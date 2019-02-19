import time
####################################################################
# This program checks the times written by BChCycle01
# If the last time there is more than 30 minutes old, we
# create a .runTime file which is then checked and deleted.
#
# meanwhile, if 30 minutes has passed, BChCycle01 moves the
# runCheck to .runCheck
####################################################################
runCheckFile = 'X@~@~@X/BeisChayim/.runCheck'
outCheckFile = 'X@~@~@X/BeisChayim/.runTime'

#runCheckFile = '../runCheck'
#outCheckFile = '../.runTime'

WAIT_TIME = 2 * 60

tm = str(time.time())
tm = tm[0:tm.find('.')]

with open(runCheckFile) as fl:
    for line in fl:
        if "TIME:" in line:
            tm2 = line[line.find(':')+2:]
            tmdiff = int(tm) - int(tm2)
print ("Waited for: " + str(tmdiff))
if tmdiff > WAIT_TIME:
    f = open(outCheckFile, "w")
    f.write(str(WAIT_TIME/60) + " minutes have passed.")
    f.close()

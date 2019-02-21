#!/bin/sh
#
#######################################################################################
# There are two possible rebuild routines:
# 1) Start with your original file - that is "CONreinstall", and
# 2) Introduce all your changes and updates into your original excel file
#     * This option means you have now separated your data from your original file
#     * And now, the baseline of this app will not be the same as the original
#######################################################################################

CODE_DIRECTORY=bcCode
TEMP_DIRECTORY=bcTemp

CYCLE_LOG=log/
#
[ -e $HOME/$TEMP_DIRECTORY ] || mkdir $HOME/$TEMP_DIRECTORY
cd $HOME/$TEMP_DIRECTORY
python $HOME/$CODE_DIRECTORY/BeisChayim/python/json2csv.py

cp $HOME/$TEMP_DIRECTORY/nYahrzeits.csv Downloads/yahrzeits.csv
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/db01.js $HOME/$TEMP_DIRECTORY/db01.js
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv $HOME/$TEMP_DIRECTORY/yahrzeits.csv
cp $HOME/$CODE_DIRECTORY/BeisChayim/CYCLE_LOG $HOME/$TEMP_DIRECTORY/CYCLE_LOG
cp $HOME/bin/appInstall $HOME/$TEMP_DIRECTORY/appInstall
rm -r bcCode
#
rm -f $HOME/bin/BChCycle01
rm -f $HOME/bin/editCrontab
rm -f $HOME/bin/turnOn
rm -f $HOME/bin/cleanUp
rm -f $HOME/bin/setView
rm -f $HOME/bin/setRun
rm -f $HOME/bin/CONreinstall

#
rm -r $HOME/$CODE_DIRECTORY
cp $HOME/bcTemp/appInstall $HOME/bin/appInstall
$HOME/bin/appInstall
cp $HOME/bcTemp/CYCLE_LOG $HOME/BeisChayim/CYCLE_LOG

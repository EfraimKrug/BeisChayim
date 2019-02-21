#!/bin/sh
#
CODE_DIRECTORY=bcCode
CYCLE_LOG=log/
#
cd $HOME
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv Downloads/yahrzeits.csv
rm -r bcCode
[ -e $HOME/bcTemp ] || mkdir $HOME/bcTemp
cp $HOME/bin/appInstall $HOME/bcTemp/appInstall
cp $HOME/BeisChayim/data/db01.js $HOME/bcTemp/db01.js
cp $HOME/BeisChayim/CYCLE_LOG $HOME/bcTemp/CYCLE_LOG
#
rm -f $HOME/bin/BChCycle01
rm -f $HOME/bin/editCrontab
rm -f $HOME/bin/turnOn
rm -f $HOME/bin/cleanUp
rm -f $HOME/bin/setView
rm -f $HOME/bin/setRun
#
rm -r $HOME/$CODE_DIRECTORY
cp $HOME/bcTemp/appInstall $HOME/bin/appInstall
$HOME/bin/appInstall
cp $HOME/bcTemp/CYCLE_LOG $HOME/BeisChayim/CYCLE_LOG

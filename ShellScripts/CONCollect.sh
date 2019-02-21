#!/bin/sh
#

CODE_DIRECTORY=bcCode
TEMP_DIRECTORY=bcTemp

CYCLE_LOG=log/
#
[ -e $HOME/$TEMP_DIRECTORY ] || mkdir $HOME/$TEMP_DIRECTORY
cd $HOME/$TEMP_DIRECTORY
python3 $HOME/$CODE_DIRECTORY/BeisChayim/console/mainBox2.py
#
cp $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig $HOME/$TEMP_DIRECTORY/BCConfig
cp $HOME/$CODE_DIRECTORY/BeisChayim/config/RunPhase $HOME/$TEMP_DIRECTORY/RunPhase
#
cp $HOME/$CODE_DIRECTORY/BeisChayim/console/BCConfig $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig
cp $HOME/$CODE_DIRECTORY/BeisChayim/console/RunPhase $HOME/$CODE_DIRECTORY/BeisChayim/config/RunPhase

$HOME/bin/turnOn $CODE_DIRECTORY

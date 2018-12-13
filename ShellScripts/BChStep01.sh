#!/bin/sh
###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################
echo "BChCycle01: "  >> $HOME/bcCode/BeisChayim/log/CycleLog
date >> $HOME/bcCode/BeisChayim/log/CycleLog
[ -n "$(find $HOME/Downloads -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/Downloads/\$\$BC\$\$* $HOME/bcCode/BeisChayim/data

# move files 5 cycles back...

mv $HOME/bcCode/BeisChayim/data/work/db01-4.js $HOME/bcCode/BeisChayim/data/work/db01-5.js
mv $HOME/bcCode/BeisChayim/data/work/db01-3.js $HOME/bcCode/BeisChayim/data/work/db01-4.js
mv $HOME/bcCode/BeisChayim/data/work/db01-2.js $HOME/bcCode/BeisChayim/data/work/db01-3.js
mv $HOME/bcCode/BeisChayim/data/work/db01-1.js $HOME/bcCode/BeisChayim/data/work/db01-2.js
mv $HOME/bcCode/BeisChayim/data/work/db01-0.js $HOME/bcCode/BeisChayim/data/work/db01-1.js

cp $HOME/bcCode/BeisChayim/js/db01.js $HOME/bcCode/BeisChayim/data/work/db01-0.js

# create the new db01.js
#cp $HOME/bcCode/BeisChayim/data/out02 $HOME/bcCode/BeisChayim/js/db01.js
cd $HOME/bcCode/BeisChayim
python $HOME/bcCode/BeisChayim/python/collect.py > $HOME/bcCode/BeisChayim/data/out03

# store all the update files
[ -n "$(find $HOME/bcCode/BeisChayim/data -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/bcCode/BeisChayim/data/\$\$BC\$\$* $HOME/bcCode/BeisChayim/data/used
cp $HOME/bcCode/BeisChayim/data/out03 $HOME/bcCode/BeisChayim/js/db01.js
cp $HOME/bcCode/BeisChayim/data/out03 $HOME/bcCode/BeisChayim/data/out02

# restart browswer
pkill -f firefox
firefox $HOME/bcCode/BeisChayim/beisChayim.html &
###############################################################################

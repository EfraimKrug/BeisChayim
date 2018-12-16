#!/bin/sh
###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################
echo "BChCycle01: "  >> $HOME/code/BeisChayim/log/CycleLog
date >> $HOME/code/BeisChayim/log/CycleLog
[ -n "$(find $HOME/Downloads -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/Downloads/\$\$BC\$\$* $HOME/code/BeisChayim/data

# move files 5 cycles back...

mv $HOME/code/BeisChayim/data/work/db01-4.js $HOME/code/BeisChayim/data/work/db01-5.js
mv $HOME/code/BeisChayim/data/work/db01-3.js $HOME/code/BeisChayim/data/work/db01-4.js
mv $HOME/code/BeisChayim/data/work/db01-2.js $HOME/code/BeisChayim/data/work/db01-3.js
mv $HOME/code/BeisChayim/data/work/db01-1.js $HOME/code/BeisChayim/data/work/db01-2.js
mv $HOME/code/BeisChayim/data/work/db01-0.js $HOME/code/BeisChayim/data/work/db01-1.js

cp $HOME/code/BeisChayim/js/db01.js $HOME/code/BeisChayim/data/work/db01-0.js

# create the new db01.js
#cp $HOME/code/BeisChayim/data/out02 $HOME/code/BeisChayim/js/db01.js
cd $HOME/code/BeisChayim
python $HOME/code/BeisChayim/python/collect.py > $HOME/code/BeisChayim/data/out03

# store all the update files
[ -n "$(find $HOME/code/BeisChayim/data -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/code/BeisChayim/data/\$\$BC\$\$* $HOME/code/BeisChayim/data/used
cp $HOME/code/BeisChayim/data/out03 $HOME/code/BeisChayim/js/db01.js
cp $HOME/code/BeisChayim/data/out03 $HOME/code/BeisChayim/data/out02

# restart browswer
pkill -f firefox
firefox $HOME/code/BeisChayim/beisChayim.html &
###############################################################################

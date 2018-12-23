###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################

[ -n "$(find $HOME/Downloads -name '\$\$BC\$\$*' | head -1)" ] || exit 0
mv $HOME/Downloads/\$\$BC\$\$* $HOME/bcCode/BeisChayim/data

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
[ -n "$(find $HOME/bcCode/BeisChayim/data/work -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/bcCode/BeisChayim/data/\$\$BC\$\$* $HOME/bcCode/BeisChayim/data/used
cp $HOME/bcCode/BeisChayim/data/out03 $HOME/bcCode/BeisChayim/js/db01.js
cp $HOME/bcCode/BeisChayim/data/out03 $HOME/bcCode/BeisChayim/data/out02

# check and install config files
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] && mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig

# restart browswer
pkill -f sensible-browser
sensible-browser --start-fullscreen $HOME/bcCode/BeisChayim/beisChayim.html &
###############################################################################

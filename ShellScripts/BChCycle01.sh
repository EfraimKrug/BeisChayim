CODE_DIRECTORY=bcCode
###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################
[ -n "$(find $HOME/Downloads -name 'yahrzeits.csv' | head -1)" ] && cp $HOME/Downloads/yahrzeits.csv $HOME/bcCode/BeisChayim/data/yahrzeits.csv
[ -n "$(find $HOME/Downloads -name 'yahrzeits.csv' | head -1)" ] && mv $HOME/$CODE_DIRECTORY/BeisChayim/data/used/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data
[ -n "$(find $HOME/Downloads -name 'yahrzeits.csv' | head -1)" ] && rm $HOME/Downloads/yahrzeits.csv $HOME/bcCode/BeisChayim/data/yahrzeits.csv
#
#
[ -n "$(find $HOME/Downloads -name '\$\$BC\$\$*' | head -1)" ] && cp $HOME/Downloads/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data
[ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim -name '.installed' | head -1)" ] || exit 0
[ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim -name '.installed' | head -1)" ] || echo installed > $HOME/$CODE_DIRECTORY/BeisChayim/.installed
#
#
# check/install config file
[ -n "$(find $HOME/Downloads -name 'BCConfig.txt' | head -1)" ] && mv $HOME/Downloads/BCConfig.txt HOME/Downloads/BCConfig
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] && mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig

# move files 5 cycles back...
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-5.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-0.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js

cp $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-0.js

# create the new db01.js
#cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out02 $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
cd $HOME/$CODE_DIRECTORY/BeisChayim
python $HOME/$CODE_DIRECTORY/BeisChayim/python/collect.py > $HOME/$CODE_DIRECTORY/BeisChayim/data/out03
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data/used
# store all the update files
[ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim/data/work -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/$CODE_DIRECTORY/BeisChayim/data/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data/used
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out03 $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out03 $HOME/$CODE_DIRECTORY/BeisChayim/data/out02

# check and install config files
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] && mv $HOME/Downloads/BCConfig $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig

# restart browswer
#pkill -f sensible-browser
#sensible-browser --start-fullscreen $HOME/$CODE_DIRECTORY/BeisChayim/beisChayim.html &
# restart browswer
ff=$(update-alternatives --display gnome-www-browser | grep firefox | wc -l)
if [ $ff -gt 0 ]
then
        pkill -f firefox
        firefox  $HOME/$CODE_DIRECTORY/BeisChayim/beisChayim.html &
        exit 0
fi

ch=$(update-alternatives --display gnome-www-browser | grep chromium | wc -l)
if [ $ch -gt 0 ]
then
        pkill -f chromium-browser
        chromium-browser --start-fullscreen  $HOME/$CODE_DIRECTORY/BeisChayim/beisChayim.html &
fi
###############################################################################

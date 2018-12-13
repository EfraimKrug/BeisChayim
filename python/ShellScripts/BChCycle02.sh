###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################

[ -n "$(find /home/efraim/Downloads -name '\$\$BC\$\$*' | head -1)" ] && mv /home/efraim/Downloads/\$\$BC\$\$* /home/efraim/code/BeisChayim/data

# move files 5 cycles back...

mv /home/efraim/code/BeisChayim/data/work/db01-4.js /home/efraim/code/BeisChayim/data/work/db01-5.js
mv /home/efraim/code/BeisChayim/data/work/db01-3.js /home/efraim/code/BeisChayim/data/work/db01-4.js
mv /home/efraim/code/BeisChayim/data/work/db01-2.js /home/efraim/code/BeisChayim/data/work/db01-3.js
mv /home/efraim/code/BeisChayim/data/work/db01-1.js /home/efraim/code/BeisChayim/data/work/db01-2.js
mv /home/efraim/code/BeisChayim/data/work/db01-0.js /home/efraim/code/BeisChayim/data/work/db01-1.js

cp /home/efraim/code/BeisChayim/js/db01.js /home/efraim/code/BeisChayim/data/work/db01-0.js

# create the new db01.js
#cp /home/efraim/code/BeisChayim/data/out02 /home/efraim/code/BeisChayim/js/db01.js
cd /home/efraim/code/BeisChayim
python /home/efraim/code/BeisChayim/python/collect.py > /home/efraim/code/BeisChayim/data/out03

# store all the update files
[ -n "$(find /home/efraim/code/BeisChayim/data/work -name '\$\$BC\$\$*' | head -1)" ] && mv /home/efraim/code/BeisChayim/data/\$\$BC\$\$* /home/efraim/code/BeisChayim/data/used
cp /home/efraim/code/BeisChayim/data/out03 /home/efraim/code/BeisChayim/js/db01.js
cp /home/efraim/code/BeisChayim/data/out03 /home/efraim/code/BeisChayim/data/out02

# restart browswer
#pkill -f firefox
#firefox /home/efraim/code/BeisChayim/beisChayim.html &
###############################################################################

###############################################################################
# this runs every 10 minutes.
# remember - this is exactly like BChCycle01, but it does not restart the
# browser
###############################################################################
date >> /home/efraiim/code/beisChayim/log/CycleLog
mv /home/efraiim/Downloads/\$\$BC\$\$* /home/efraiim/code/beisChayim/data

# move filesom 5 cycles back...

mv /home/efraiim/code/beisChayim/data/work/db01-4.js /home/efraiim/code/beisChayim/data/work/db01-5.js
mv /home/efraiim/code/beisChayim/data/work/db01-3.js /home/efraiim/code/beisChayim/data/work/db01-4.js
mv /home/efraiim/code/beisChayim/data/work/db01-2.js /home/efraiim/code/beisChayim/data/work/db01-3.js
mv /home/efraiim/code/beisChayim/data/work/db01-1.js /home/efraiim/code/beisChayim/data/work/db01-2.js
mv /home/efraiim/code/beisChayim/data/work/db01-0.js /home/efraiim/code/beisChayim/data/work/db01-1.js

cp /home/efraiim/code/beisChayim/js/db01.js /home/efraiim/code/beisChayim/data/work/db01-0.js

# create the new db01.js
#cp /home/efraiim/code/beisChayim/data/out02 /home/efraiim/code/beisChayim/js/db01.js
cd /home/efraiim/code/beisChayim
python /home/efraiim/code/beisChayim/python/collect.py > /home/efraiim/code/beisChayim/data/out03

# store all the update files
mv /home/efraiim/code/beisChayim/data/\$\$BC\$\$* /home/efraiim/code/beisChayim/data/used
cp /home/efraiim/code/beisChayim/data/out03 /home/efraiim/code/beisChayim/js/db01.js
cp /home/efraiim/code/beisChayim/data/out03 /home/efraiim/code/beisChayim/data/out02
#
# restart browswer
#pkill -f firefox
#firefox /home/efraiim/code/beisChayim/beisChayim.html &
###############################################################################

cd ~/code/beisChayim
###############################################################################
# this is a restart from the gitgo.. that is - it starts from the
# shulcloud download.. and it goes through history of all updates
###############################################################################

# get the shulcloud file cleaned up... and converted to json
python python/cleanup01.py > data/out01
python python/csv2jsond.py > data/out02

# move files 5 cycles back...
mv data/work/db01-4.js data/work/db01-5.js
mv data/work/db01-3.js data/work/db01-4.js
mv data/work/db01-2.js data/work/db01-3.js
mv data/work/db01-1.js data/work/db01-2.js
mv data/work/db01-0.js data/work/db01-1.js

cp js/db01.js data/work/db01-0.js
cp data/out02 js/db01.js

# now move all the old change files back...
cp data/used/$$BC$$* data

# collect
python python/collect.py > data/out03

# restore to used...
mv data/\$\$BC\$\$* data/used

# and set up our new db01.js
cp data/out03 js/db01.js

# restart browswer
pkill -f firefox
firefox beisChayim.html &

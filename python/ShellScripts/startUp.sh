cd $HOME/bcCode/BeisChayim
###############################################################################
# this is a restart from the gitgo.. that is - it starts from the
# shulcloud download.. and it goes through history of all updates
###############################################################################

# get the shulcloud file cleaned up... and converted to json
python $HOME/bcCode/BeisChayim/python/cleanup01.py > $HOME/bcCode/BeisChayim/data/out01
python $HOME/bcCode/BeisChayim/python/csv2jsond.py > $HOME/bcCode/BeisChayim/data/out02

# move files 5 cycles back...
mv $HOME/bcCode/BeisChayim/data/work/db01-4.js $HOME/bcCode/BeisChayim/data/work/db01-5.js
mv $HOME/bcCode/BeisChayim/data/work/db01-3.js $HOME/bcCode/BeisChayim/data/work/db01-4.js
mv $HOME/bcCode/BeisChayim/data/work/db01-2.js $HOME/bcCode/BeisChayim/data/work/db01-3.js
mv $HOME/bcCode/BeisChayim/data/work/db01-1.js $HOME/bcCode/BeisChayim/data/work/db01-2.js
mv $HOME/bcCode/BeisChayim/data/work/db01-0.js $HOME/bcCode/BeisChayim/data/work/db01-1.js

cp $HOME/bcCode/BeisChayim/js/db01.js $HOME/bcCode/BeisChayim/data/work/db01-0.js
cp $HOME/bcCode/BeisChayim/data/out02 $HOME/bcCode/BeisChayim/js/db01.js

# # now move all the old change files back...
# cp data/used/$$BC$$* data
#
# # collect
# python python/collect.py > data/out03
#
# # restore to used...
# mv data/\$\$BC\$\$* data/used
#
# # and set up our new db01.js
# cp data/out03 js/db01.js
#
# # restart browswer
# #pkill -f firefox
# #firefox BeisChayim.html &
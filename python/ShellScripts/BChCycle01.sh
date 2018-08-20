###############################################################################
# this runs every night.
# remember - this is running without getting new data
# from shulcloud...
###############################################################################

# move files 5 cycles back...

mv ~/code/beisChayim/data/work/db01-4.js ~/code/beisChayim/data/work/db01-5.js
mv ~/code/beisChayim/data/work/db01-3.js ~/code/beisChayim/data/work/db01-4.js
mv ~/code/beisChayim/data/work/db01-2.js ~/code/beisChayim/data/work/db01-3.js
mv ~/code/beisChayim/data/work/db01-1.js ~/code/beisChayim/data/work/db01-2.js
mv ~/code/beisChayim/data/work/db01-0.js ~/code/beisChayim/data/work/db01-1.js

cp ~/code/beisChayim/js/db01.js ~/code/beisChayim/data/work/db01-0.js

# create the new db01.js
cp ~/code/beisChayim/data/out02 ~/code/beisChayim/js/db01.js
python ~/code/beisChayim/python/collect.py > ~/code/beisChayim/data/out03

# store all the update files
mv ~/code/beisChayim/data/\$\$BC\$\$* ~/code/beisChayim/data/used
cp ~/code/beisChayim/data/out03 ~/code/beisChayim/js/db01.js

# restart browswer
pkill -f firefox
firefox ~/code/beisChayim/beisChayim.html
###############################################################################

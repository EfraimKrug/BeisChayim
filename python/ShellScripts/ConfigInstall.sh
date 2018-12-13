cd /home/efraim/code/beisChayim
[ -n "$(find /home/efraim/Downloads -name 'BCConfig' | head -1)" ] && mv /home/efraim/Downloads/BCConfig /home/efraim/code/BeisChayim/config

# restart browswer
pkill -f firefox
firefox /home/efraim/code/BeisChayim/beisChayim.html &

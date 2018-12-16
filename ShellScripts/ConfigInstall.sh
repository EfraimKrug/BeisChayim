cd $HOME/code/BeisChayim
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] && mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig
# restart browser
pkill -f firefox
firefox $HOME/bcCode/BeisChayim/beisChayim.html &

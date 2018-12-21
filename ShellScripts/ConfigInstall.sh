cd $HOME/code/BeisChayim
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] || exit 0
mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig
# restart browser
pkill -f chromium-browser
chromium-browser --start-fullscreen $HOME/bcCode/BeisChayim/beisChayim.html &

cd $HOME/code/BeisChayim
X=0
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] || X=1
[ -n "$(find $HOME/Downloads -name 'BCConfig.txt' | head -1)" ] || X=2
if [ $X -eq 0 ];then exit 0; fi
if [ $X -eq 1 ];then mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig; fi
if [ $X -eq 2 ];then mv $HOME/Downloads/BCConfig.txt $HOME/bcCode/BeisChayim/config/BCConfig; fi
# restart browser
pkill -f chromium-browser
chromium-browser --start-fullscreen $HOME/bcCode/BeisChayim/beisChayim.html &

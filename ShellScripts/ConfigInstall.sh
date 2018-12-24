cd $HOME/code/BeisChayim
[ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ] || exit 0
mv $HOME/Downloads/BCConfig $HOME/bcCode/BeisChayim/config/BCConfig
# restart browser
# restart browswer
ff=$(update-alternatives --config gnome-www-browser | grep firefox | wc -l)
if [ $ff -gt 0 ]
then
        pkill -f firefox
        firefox  $HOME/bcCode/BeisChayim/beisChayim.html &
fi

ch=$(update-alternatives --config gnome-www-browser | grep chromium | wc -l)
if [ $ch -gt 0 ]
then
        pkill -f chromium-browser
        chromium-browser --start-fullscreen  $HOME/bcCode/BeisChayim/beisChayim.html &
fi

#pkill -f sensible-browser
#sensible-browser --start-fullscreen $HOME/bcCode/BeisChayim/beisChayim.html &

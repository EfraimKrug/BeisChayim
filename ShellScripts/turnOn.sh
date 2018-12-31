ff=$(update-alternatives --display gnome-www-browser | grep firefox | wc -l)
if [ $ff -gt 0 ]
then
        pkill -f firefox
        firefox  $HOME/bcCode/BeisChayim/beisChayim.html &
        exit 0
fi

ch=$(update-alternatives --display gnome-www-browser | grep chromium | wc -l)
if [ $ch -gt 0 ]
then
        pkill -f chromium-browser
        chromium-browser --start-fullscreen  $HOME/bcCode/BeisChayim/beisChayim.html &
fi

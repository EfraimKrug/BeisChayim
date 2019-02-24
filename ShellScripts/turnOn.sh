#!/bin/sh
CODE_DIRECTORY=$1
unclutter -idle 2 &
ff=$(update-alternatives --display gnome-www-browser | grep firefox | wc -l)
if [ $ff -gt 0 ]
then
        pkill -f firefox
        firefox  $HOME/$CODE_DIRECTORY/BeisChayim/beisChayim.html &
        exit 0
fi

ch=$(update-alternatives --display gnome-www-browser | grep chromium | wc -l)
if [ $ch -gt 0 ]
then
        pkill -f chromium-browser
        chromium-browser --start-fullscreen  $HOME/$CODE_DIRECTORY/BeisChayim/beisChayim.html &
        exit 0
fi
~

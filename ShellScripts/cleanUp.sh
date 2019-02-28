CODE_DIRECTORY=bcCode
TEMP_DIRECTORY=bcTemp
cd $HOME
mkdir $TEMP_DIRECTORY
mkdir $TEMP_DIRECTORY/config
cp $HOME/$CODE_DIRECTORY/BeisChayim/config/* $TEMP_DIRECTORY/config
cp $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js $HOME/$TEMP_DIRECTORY/db01.js
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv $HOME/$TEMP_DIRECTORY/yahrzeits.csv
cd $HOME/$CODE_DIRECTORY/BeisChayim/python
python3 json2csv.py
mv nYahrzeits.csv $HOME/$TEMP_DIRECTORY/nYahrzeits.csv
cp $HOME/bin/appInstall $HOME/$TEMP_DIRECTORY/appInstall
rm -f -r $CODE_DIRECTORY
rm -f Downloads/*.zip
rm -f bin/*
mv $HOME/$TEMP_DIRECTORY/appInstall bin/appInstall
mv $HOME/$TEMP_DIRECTORY/nYahrzeits.csv $HOME/Downloads/yahrzeits.csv
sudo vi /etc/crontab

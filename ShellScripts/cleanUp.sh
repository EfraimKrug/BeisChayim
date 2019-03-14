CODE_DIRECTORY=bcCode
TEMP_DIRECTORY=bcTemp
cd $HOME
echo Making new directories
mkdir $TEMP_DIRECTORY
mkdir $TEMP_DIRECTORY/config
echo copying files: config, db, and csv
cp $HOME/$CODE_DIRECTORY/BeisChayim/config/* $TEMP_DIRECTORY/config
cp $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js $HOME/$TEMP_DIRECTORY/db01.js
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv $HOME/$TEMP_DIRECTORY/yahrzeits.csv
cd $HOME/$CODE_DIRECTORY/BeisChayim/python
echo running python routine
python3 json2csv.py
echo move yahrzeits file to load staging
mv nYahrzeits.csv $HOME/$TEMP_DIRECTORY/nYahrzeits.csv
echo moving install routine to bin
cp $HOME/bin/appInstall $HOME/$TEMP_DIRECTORY/appInstall
cd $HOME
echo removing old directories
rm -f -r $CODE_DIRECTORY
rm -f $HOME/Desktop/BeisChayim*
echo removing zip files in Downloads
rm -f Downloads/*.zip
echo removing bin files
rm -f bin/*
mv $HOME/$TEMP_DIRECTORY/appInstall bin/appInstall
sudo vi /etc/crontab

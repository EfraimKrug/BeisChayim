CODE_DIRECTORY=bcCode
CYCLE_LOG=$HOME/$CODE_DIRECTORY/BeisChayim/log/CYCLE_LOG
PIC_DIR=$HOME/$CODE_DIRECTORY/BeisChayim/img
PDF_DIR=$HOME/$CODE_DIRECTORY/BeisChayim/pdf
jsFile=$HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
configFile=$HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig
#
###########################################################################################
## keep log file in check...
###########################################################################################
cd $HOME/$CODE_DIRECTORY/BeisChayim/log
FILE_SIZE=$(ls -l | awk '{print $5}')
if [ $FILE_SIZE -gt 99999 ] ;
then
  echo restarting cycle log > $CYCLE_LOG ;
fi
#
###########################################################################################
## set parameters to check for first run
###########################################################################################
if [ $# -ne 1 ];
then
  START_UP="NOPE"
else
  START_UP=$1
fi
###########################################################################################
## process the thumbdrive...CYCLE_LOG
###########################################################################################
cd ~/bin
#rm -f a
lsblk > .lsblk2
diff .lsblk1 .lsblk2 | grep media > TEMP
FILE_SIZE=$(ls -l TEMP | awk '{print $5}')
if [ $FILE_SIZE -le 25 ] ;
then
  echo Skipping thumbdrive check >> $CYCLE_LOG ;
else
    echo $FILE_SIZE
# reinitialize
    cp .lsblk2 .lsblk1
    DIR=$(awk '{print $8}' TEMP)
    cd $DIR
    Q=$(cat .BeisChayim/.LABEL)
    if [[ "$Q" = "INSTALLED" ]] ;
    then
    	cp BeisChayim/img/* $PIC_DIR
    	cp BeisChayim/pdf/* $PDF_DIR
    	[ -n "$(find BeisChayim/data/staging -name 'db01.js' | head -1)" ] && cp BeisChayim/data/staging/db01.js $jsFile
    	mv BeisChayim/data/staging/db01.js BeisChayim/data/db01-old.js
      [ -n "$(find BeisChayim/config -name 'BCConfig' | head -1)" ] && cp BeisChayim/config/BCConfig $configFile
      mv BeisChayim/config/BCConfig BeisChayim/config/BCConfig-old.js
      cp $jsFile BeisChayim/js/db01.js
      cp $configFile BeisChayim/config/BCConfig
      echo Processed Thumbdrive File  >> $CYCLE_LOG
      echo `date` Restarting Application >> $CYCLE_LOG
      $HOME/bin/turnOn $CODE_DIRECTORY
      exit 0
    fi
fi

###########################################################################################
## process the db01.js file if it is in staging...
###########################################################################################
if [ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim/data/staging -name 'db01.js' | head -1)" ]
then
  echo `date` Restarting Application >> $CYCLE_LOG
  echo Found a staged db01.js file >> $CYCLE_LOG

  cp $HOME/$CODE_DIRECTORY/BeisChayim/data/staging/db01.js $HOME/$CODE_DIRECTORY/BeisChayim/data/out03
  mv $HOME/$CODE_DIRECTORY/BeisChayim/data/staging/db01.js $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
  cd $HOME/$CODE_DIRECTORY/BeisChayim/python
  python $HOME/$CODE_DIRECTORY/BeisChayim/python/json2csv.py
  mv $HOME/$CODE_DIRECTORY/BeisChayim/python/nYahrzeits.csv $HOME/Downloads/yahrzeits.csv
fi
#
if [ -n "$(find $HOME/Downloads -name 'yahrzeits.csv' | head -1)" ]
then
   echo =================== NEW YAHRZEIT FILE ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   mv $HOME/Downloads/yahrzeits.csv $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv
   echo `date` Installing new yahrzeit file >> $CYCLE_LOG
   python $HOME/$CODE_DIRECTORY/BeisChayim/python/cleanup01.py > $HOME/$CODE_DIRECTORY/BeisChayim/data/out01
   python $HOME/$CODE_DIRECTORY/BeisChayim/python/csv2jsond.py > $HOME/$CODE_DIRECTORY/BeisChayim/data/out02
fi
###########################################################################################
## process the $$BC$$ files if it is there...
###########################################################################################
if [ -n "$(find $HOME/Downloads -name '\$\$BC\$\$*' | head -1)" ]
then
   echo =================== NEW \$\$BC\$\$ FILES ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   mv $HOME/Downloads/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data
fi

###########################################################################################
## process the config files if it is there...
###########################################################################################
if [ -n "$(find $HOME/Downloads -name 'BCConfig.txt' | head -1)" ]
then
    echo =================== NEW CONFIG FILE ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo `date` Installing new config file >> $CYCLE_LOG
    mv $HOME/Downloads/BCConfig.txt $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig
fi
#
if [ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ]
then
    echo =================== NEW CONFIG FILE ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo =================== NEW CONFIG FILE ===================== >> $CYCLE_LOG
    echo `date` Installing new config file >> $CYCLE_LOG
    mv $HOME/Downloads/BCConfig $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig
fi

########### begin the clock service #########################################################
if [ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim -name '.runCheck' | head -1)" ]
then
  python $HOME/$CODE_DIRECTORY/BeisChayim/python/readRunCheck.py
  #echo wrote to: $HOME/$CODE_DIRECTORY/BeisChayim/.runTime
else
  #echo there is nothing to run! && exit 0
  if [ $START_UP != "START_UP" ];
  then
    exit 0
  fi
fi
#
if [ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim -name '.runTime' | head -1)" ]
then
  echo =============================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runTimeLog
  echo `date` >>  $HOME/$CODE_DIRECTORY/BeisChayim/.runTimeLog
  cat  $HOME/$CODE_DIRECTORY/BeisChayim/.runTime >>  $HOME/$CODE_DIRECTORY/BeisChayim/.runTimeLog
  cat  $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheckLog
  #echo Run the whole shebang - but only once!
else
  #echo not time yet... && exit 0
  echo =================== Not time to restart... ===================== >> $CYCLE_LOG
  if [ $START_UP != "START_UP" ];
  then
    exit 0
  fi
fi
########### end the clock service #########################################################
###########################################################################################
## process everything - start by cleaning up the timing files...
###########################################################################################
rm $HOME/$CODE_DIRECTORY/BeisChayim/.runTime
rm $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
#echo it was time to run... and we are running!

###########################################################################################
## process everything - back up files...
###########################################################################################
#mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-5.js
#mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js
#mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js
#mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js
#mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-0.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js

cp $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-0.js
###########################################################################################
## process everything - collect all the $$BC$$ files into db01.js
###########################################################################################
cd $HOME/$CODE_DIRECTORY/BeisChayim
python $HOME/$CODE_DIRECTORY/BeisChayim/python/collect.py > $HOME/$CODE_DIRECTORY/BeisChayim/data/out03
[ -n "$(find $HOME/$CODE_DIRECTORY/BeisChayim/data/work -name '\$\$BC\$\$*' | head -1)" ] && mv $HOME/$CODE_DIRECTORY/BeisChayim/data/\$\$BC\$\$* $HOME/$CODE_DIRECTORY/BeisChayim/data/used

###########################################################################################
## process everything - copy output from collect.py to db01.js and back it up
###########################################################################################
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out03 $HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
#cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out03 $HOME/$CODE_DIRECTORY/BeisChayim/data/out02

###########################################################################################
## restart the application
###########################################################################################
echo `date` Restarting Application >> $CYCLE_LOG
$HOME/bin/turnOn $CODE_DIRECTORY

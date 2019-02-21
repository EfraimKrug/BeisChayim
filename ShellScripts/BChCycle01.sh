CODE_DIRECTORY=bcCode
CYCLE_LOG=$HOME/$CODE_DIRECTORY/BeisChayim/log/
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
## process the yahrzeits.csv file if it is there...
###########################################################################################
if [ -n "$(find $HOME/Downloads -name 'yahrzeits.csv' | head -1)" ]
then
   echo =================== NEW YAHRZEIT FILE ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
   mv $HOME/Downloads/yahrzeits.csv $HOME/$CODE_DIRECTORY/BeisChayim/data/yahrzeits.csv
   echo `date` Installing new yahrzeit file >> CYCLE_LOG
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
    echo `date` Installing new config file >> CYCLE_LOG
    mv $HOME/Downloads/BCConfig.txt $HOME/$CODE_DIRECTORY/BeisChayim/config/BCConfig
fi
#
if [ -n "$(find $HOME/Downloads -name 'BCConfig' | head -1)" ]
then
    echo =================== NEW CONFIG FILE ===================== >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo `date` >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo TIME: `date +%s`  >> $HOME/$CODE_DIRECTORY/BeisChayim/.runCheck
    echo `date` Installing new config file >> CYCLE_LOG
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
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-5.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-4.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-3.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-2.js
mv $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-0.js $HOME/$CODE_DIRECTORY/BeisChayim/data/work/db01-1.js

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
cp $HOME/$CODE_DIRECTORY/BeisChayim/data/out03 $HOME/$CODE_DIRECTORY/BeisChayim/data/out02

###########################################################################################
## restart the application
###########################################################################################
echo `date` Restarting Application >> CYCLE_LOG
$HOME/bin/turnOn $CODE_DIRECTORY

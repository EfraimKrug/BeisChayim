cd $HOME/code/BeisChayim/work
cp /etc/crontab crontab.txt
echo '*/2 * * * *      pi  export  DISPLAY=:0 && $HOME/bin/BChCycle01 &>$HOME/cron.log' >> crontab.txt
echo '*/3 * * * *      pi  export  DISPLAY=:0 && $HOME/bin/ConfigInstall &>$HOME/cron.log' >> crontab.txt
cat crontab.txt
sudo cp crontab.txt /etc/crontab
b0st0n

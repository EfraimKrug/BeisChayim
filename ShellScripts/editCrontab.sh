cd $HOME/$1//BeisChayim/work
cp /etc/crontab crontab.txt
echo '*/2 * * * *      '$(whoami)  ' export  DISPLAY=:0 && $HOME/bin/BChCycle01 &>$HOME/cron.log' >> crontab.txt
#echo '*/3 * * * *      '$(whoami)  ' export  DISPLAY=:0 && $HOME/bin/ConfigInstall &>$HOME/cron.log' >> crontab.txt
cat crontab.txt
sudo cp crontab.txt /etc/crontab

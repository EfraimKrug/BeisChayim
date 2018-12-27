cd ~
rm -r bcCode
rm Downloads/Screen10.1.zip
cp bin/appInstall
rm -f bin/*
mv appInstall bin/appInstall
cp Downloads/hold/yahrzeits.csv Downloads/yahrzeits.csv
sudo vi /etc/crontab

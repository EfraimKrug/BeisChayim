CODE_DIRECTORY=bcCode
PIC_DIR=$HOME/$CODE_DIRECTORY/BeisChayim/img
PDF_DIR=$HOME/$CODE_DIRECTORY/BeisChayim/pdf
jsFile=$HOME/$CODE_DIRECTORY/BeisChayim/js/db01.js
###################################################
# Notice: travel flash drive
# Must have a directory: .BeisChayim/.LABEL
# The contents of that .LABEL must be INSTALLED...
# Then everything should work properly
###################################################
cd ~/bin
rm -f a
lsblk > .lsblk2
diff .lsblk1 .lsblk2 | grep media > TEMP
DIR=$(awk '{print $8}' TEMP)
cd $DIR
Q=$(cat .BeisChayim/.LABEL)
if [[ "$Q" = "INSTALLED" ]] ; then
	cp BeisChayim/img/* $PIC_DIR
	cp BeisChayim/pdf/* $PDF_DIR
	[ -n "$(find BeisChayim/data/staging -name 'db01.js' | head -1)" ] && cp BeisChayim/data/staging/db01.js $jsFile
	mv BeisChayim/data/staging/db01.js BeisChayim/data/db01-old.js
fi
cp $jsFile BeisChayim/js/db01.js
cd ~/bin

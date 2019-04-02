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
	echo YO BABY
fi
echo END 

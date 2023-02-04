#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "01 * * * * echo hello" >> mycron
#install new cron file
crontab mycron
rm mycron

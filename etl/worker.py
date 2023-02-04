from crontab import CronTab

cron = CronTab(user="root")
job = cron.new(command="/usr/local/bin/python3 /etl/test.py", comment="cdd-etl")
job.hour.every(1)
cron.write()


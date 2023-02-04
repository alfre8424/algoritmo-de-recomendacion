from crontab import CronTab

cron = CronTab(user="root")
job = cron.new(command="/usr/local/bin/python3 /etl/test.py", comment="cdd-etl")
job.minute.every(1)
cron.write()


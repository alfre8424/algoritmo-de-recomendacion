from crontab import CronTab

cron = CronTab(user="root")
job = cron.new(command="touch /etl/rt.py", comment="cdd-etl")
job.minute.every(1)
cron.write()


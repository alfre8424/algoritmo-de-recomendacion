from crontab import CronTab

cron = CronTab(user="joel")
job = cron.new(command="code .", comment="cdd-etl")
job.minute.every(1)
cron.write()

from crontab import CronTab

cron = CronTab(user="joel")

for job in cron:
    if job.comment == "cdd-etl":
        cron.remove(job)
        cron.write()


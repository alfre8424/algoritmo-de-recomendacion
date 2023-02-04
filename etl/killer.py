from crontab import CronTab

cron = CronTab(user="root")

for job in cron:
    if job.comment == "cdd-etl":
        cron.remove(job)
        cron.write()


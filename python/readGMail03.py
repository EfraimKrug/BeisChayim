
import smtplib
import time
import imaplib
import email

# -------------------------------------------------
# Change
# mahtzevah@gmail.com
# pwd: mtb0st0n
# note: you need to sign onto google account, then
# go to: https://myaccount.google.com/lesssecureapps
# and give access...
# -------------------------------------------------
#
# Utility to read email from Gmail Using Python
#
# ------------------------------------------------
ORG_EMAIL   = "@gmail.com"
FROM_EMAIL  = "mahtzevah" + ORG_EMAIL
FROM_PWD    = "mtb0st0n"
SMTP_SERVER = "imap.gmail.com"
SMTP_PORT   = 993

def read_email_from_gmail():
    try:
        mail = imaplib.IMAP4_SSL(SMTP_SERVER)
        mail.login(FROM_EMAIL,FROM_PWD)
        mail.select('inbox')

        type, data = mail.search(None, 'ALL')
        mail_ids = data[0]

        id_list = mail_ids.split()
        first_email_id = int(id_list[0])
        latest_email_id = int(id_list[-1])


        for i in range(latest_email_id,first_email_id, -1):
            typ, data = mail.fetch(i, '(RFC822)' )

            for response_part in data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_string(response_part[1])
                    email_subject = msg['subject']
                    email_from = msg['from']
                    body = msg['body']
                    r = email_subject.index("Post")
                    if r > -1:
                        print 'From : ' + email_from + '\n'
                        print 'Subject : ' + email_subject + '\n'
                        print 'Body : ' + body

    except Exception, e:
        print str(e)

read_email_from_gmail()

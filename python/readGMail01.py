ORG_EMAIL   = "@gmail.com"
FROM_EMAIL  = "efraimmkrug" + ORG_EMAIL
FROM_PWD    = "torah613"
SMTP_SERVER = "imap.gmail.com"
SMTP_PORT   = 993

def readmail():
    # mail reading logic will come here !!
    mail = imaplib.IMAP4_SSL(SMTP_SERVER)
    mail.login(FROM_EMAIL,FROM_PWD)
    mail.select('inbox')

    type, data = mail.search(None, 'ALL')
    mail_ids = data[0]
    id_list = mail_ids.split()

    first_email_id = int(id_list[0])
    latest_email_id = int(id_list[-1])

    typ, data = mail.fetch(first_email_id, '(RFC822)' ) # i is the email id
    print typ
    print data

readmail()

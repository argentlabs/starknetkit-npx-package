import * as ImapClient from 'imap-simple';
import { simpleParser } from 'mailparser';

export default class SapoEmailClient {
    private config: any;

    constructor(email: string, password: string) {
        this.config = {
            imap: {
                user: email,
                password: password,
                host: 'imap.sapo.pt',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                authTimeout: 3000
            }
        };
    }

    async readEmails(options: {
        folder?: string;
        limit?: number;
        markSeen?: boolean;
        onlyUnread?: boolean;
    } = {}) {
        const {
            folder = 'INBOX',
            limit = 10,
            markSeen = true,
            onlyUnread = true
        } = options;

        try {
            const connection = await ImapClient.connect(this.config);
            await connection.openBox(folder);

            // Search criteria for unread messages
            const searchCriteria = onlyUnread ? ['UNSEEN'] : ['ALL'];

            // Fetch messages
            const messages = await connection.search(searchCriteria, {
                bodies: [''],
                markSeen: markSeen
            });

            // Get latest messages based on limit
            const latestMessages = messages.slice(-limit);

            // Parse messages
            const emails = await Promise.all(
                latestMessages.map(async (item) => {
                    const fullBody = item.parts.find(part => part.which === '');

                    if (fullBody) {
                        const parsed = await simpleParser(fullBody.body);
                        return {
                            id: item.attributes.uid,
                            subject: parsed.subject,
                            from: parsed.from?.text,
                            date: parsed.date,
                            text: parsed.text,
                            html: parsed.html
                        };
                    }
                })
            );

            await connection.end();
            return emails.filter(email => email !== undefined);

        } catch (error) {
            console.error('Error reading emails:', error);
            throw error;
        }
    }

    async waitForNewEmail(options: {
        timeout?: number;
        subject?: string;
        markSeen?: boolean;
        pollInterval?: number;
    } = {}): Promise<any> {
        const {
            timeout = 30000,
            subject = '',
            markSeen = true,
            pollInterval = 2000  // Check every 2 seconds by default
        } = options;

        const startTime = Date.now();
        console.log('Waiting for new unread email...');

        while (Date.now() - startTime < timeout) {
            try {
                const emails = await this.readEmails({
                    limit: 5,
                    markSeen: markSeen,
                    onlyUnread: true
                });

                if (emails && emails.length > 0) {
                    // If subject is specified, filter by it
                    const matchingEmail = emails.find(email =>
                        !subject ||
                        (email.subject && email.subject.includes(subject))
                    );

                    if (matchingEmail) {
                        console.log('Found matching email:', {
                            subject: matchingEmail.subject,
                        });
                        return matchingEmail;
                    }
                }

                // Wait before next check
                await new Promise(resolve => setTimeout(resolve, pollInterval));
            } catch (error) {
                console.error('Error checking emails:', error);
                // Wait before retry after error
                await new Promise(resolve => setTimeout(resolve, pollInterval));
            }
        }

        throw new Error(`No new email found within timeout of ${timeout}ms`);
    }
    async getPin(): Promise<string> {
        try {
            const email = await this.waitForNewEmail();
            return email.subject.match(/\d{6}/)?.[0];

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}


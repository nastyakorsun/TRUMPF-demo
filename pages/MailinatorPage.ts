import { Page, expect } from '@playwright/test';

export class MailinatorPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(email: string, password: string) {
        await this.page.goto('https://www.mailinator.com/');
        await this.page.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' }).click();
        await this.page.locator('input[placeholder="Email"]').fill(email);
        await this.page.locator('input[placeholder="Password"]').fill(password);
        await this.page.locator('input[placeholder="Password"]').press('Enter');
    }

    async openFirstEmail() {
        const firstEmailSelector = 'tr.ng-scope:first-child';
        await this.page.waitForSelector(firstEmailSelector);
        await this.page.click(firstEmailSelector);
        await this.page.waitForLoadState();
    }

    async openEmailBySubject(subject: string) {
        const emailSelector = `td.ng-binding:has-text("${subject}")`;
        const emailElement = await this.page.locator(emailSelector).first();
        await emailElement.click();
        await this.page.waitForLoadState();
    }

    async clickAttachmentsTab() {
        const attachmentsTabSelector = 'a#pills-attachments-tab';
        await this.page.click(attachmentsTabSelector);
    } 

    async clickLinkInEmail(linkText: string) {
        await this.page.frameLocator('iframe[name="texthtml_msg_body"]').getByRole('link', { name: linkText }).click({ timeout: 10000 });
    }

    async verifyAndDownloadAttachment(expectedFileName: string) {
        const attachmentsSectionSelector = '#pills-attachments-content';
        await this.page.waitForSelector(attachmentsSectionSelector);
        const downloadButtonSelector = 'button.btn.btn-xs.btn-dark';
        const downloadButton = this.page.locator(downloadButtonSelector);
        await expect(downloadButton).toHaveText(expectedFileName);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), 
            downloadButton.click(), 
        ]);
        const downloadPath = await download.path();
        const downloadName = download.suggestedFilename();
        console.log(`Download started: ${downloadName}`);
        await expect(downloadName).toBe(expectedFileName);
    }
}



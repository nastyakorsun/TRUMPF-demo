import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export class MailinatorPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly firstEmail: Locator;
    readonly attachmentsTab: Locator;
    readonly emailFrame: FrameLocator;
    readonly downloadButton: Locator;
    readonly attachmentsSection: Locator;
   

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' });
        this.emailInput = page.locator('input[placeholder="Email"]');
        this.passwordInput = page.locator('input[placeholder="Password"]');
        this.firstEmail = page.locator('tr.ng-scope:first-child');
        this.attachmentsTab = page.locator('a#pills-attachments-tab');
        this.emailFrame = page.frameLocator('iframe[name="texthtml_msg_body"]');
        this.downloadButton = page.locator('button.btn.btn-xs.btn-dark');
        this.attachmentsSection = page.locator('#pills-attachments-content');
    }

    async login(email: string, password: string) {
        await this.page.goto('https://www.mailinator.com/');
        await this.loginLink.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
    }

    async openFirstEmail() {
        await this.firstEmail.waitFor();
        await this.firstEmail.click();
        await this.page.waitForLoadState();
    }

    async openEmailBySubject(subject: string) {
        const emailElement = this.page.locator(`td.ng-binding:has-text("${subject}")`).first();
        await emailElement.click();
        await this.page.waitForLoadState();
    }

    async clickAttachmentsTab() {
        await this.attachmentsTab.click();
    }

   
    async clickLinkInEmail(linkText: string) {
        await this.emailFrame.getByRole('link', { name: linkText }).click({ timeout: 10000 });
    }

    async verifyAndDownloadAttachment(expectedFileName: string) {
        await this.attachmentsSection.waitFor();
        await expect(this.downloadButton).toHaveText(expectedFileName);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadButton.click(),
        ]);
        const downloadPath = await download.path();
        const downloadName = download.suggestedFilename();
        console.log(`Download started: ${downloadName}`);
        await expect(downloadName).toBe(expectedFileName);
    }
}




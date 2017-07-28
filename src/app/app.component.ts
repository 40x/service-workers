import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    swRegistration: any;
    pushButton: any = {};
    isSubscribed: boolean;
    applicationServerPublicKey: any = 'BFjU0uqXm5waM102XYoa4xbMfom742hgNzVdSLDQ1iqqHVGGvZ_hHEKisPUdWCLmb2cOvA2YM_qE_oaF1hEiLY4';
    subscription: any;


    constructor() {
        this.init();
    }


    init() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('./service-worker.js')
                .then((swReg) => {
                    this.swRegistration = swReg;
                    this.initialiseUI();
                })
                .catch((error) => {
                    this.pushButton.textContent = 'Push Not Supported';
                    this.pushButton.disabled = true;
                    console.error('Service Worker Error', error);
                });
        } else {
            this.pushButton.textContent = 'Push Not Supported';
            this.pushButton.disabled = true;
        }
    }

    initialiseUI() {
        // Set the initial subscription value
        this.swRegistration.pushManager.getSubscription()
            .then((subscription) => {
                this.isSubscribed = !(subscription === null);

                if (this.isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                this.updateBtn();
            });
    }

    updateBtn() {
        if (this.isSubscribed) {
            this.pushButton.textContent = 'Disable Push Messaging';
        } else {
            this.pushButton.textContent = 'Enable Push Messaging';
        }

        this.pushButton.disabled = false;
    }

    toggleSubscription() {
        this.pushButton.disabled = true;
        if(this.isSubscribed) {
            this.swRegistration.pushManager.getSubscription()
                .then((subscription) => {

                    subscription.unsubscribe()
                        .then(() => {
                            this.subscription = null;
                            this.initialiseUI();
                        });
                });
        } else {
            const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
            this.swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
                .then((subscription) => {
                    console.log('User is subscribed.');

                    this.updateSubscriptionOnServer(subscription);

                    this.isSubscribed = true;

                    this.updateBtn();

                })
                .catch((err) => {
                    console.log('Failed to subscribe the user: ', err);
                    this.updateBtn();
                });
        }
    }

    updateSubscriptionOnServer(sub) {
        this.subscription = sub;
    }

    urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

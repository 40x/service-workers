const webpush = require('web-push');

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/cTUJznT6Bac:APA91bGubkg-CE9gICRiDRB8JoHjJC4lrwGdoZVwst_D78Gr5vV87RXpUPHHlmSM9igvifXb4OAVYGcZGENC8s5BRFDi04ev1DkiayUvCg3k8QIifxq7rn8sWk-Cub8IRqsVHNhazvtu",
	"keys": {
		"p256dh": "BF50PHovC68mt_7nquWQXn3Pn3G2JXSY0dhbLiHirXmPyQVsZib1Ef_lCWNUVaSTRuBp2APQXWpwnfVfqwlvPbY=",
		"auth": "mmnEmzZg3VyKt__AByoRng=="
	}
};


webpush.sendNotification(pushSubscription, 'This is awsome stuff ya!!', {
// these were same details as generated from vapidConf.js
	vapidDetails: {
		subject: 'mailto:kashyap.mukkamala@gmail.com',
		publicKey: 'BFjU0uqXm5waM102XYoa4xbMfom742hgNzVdSLDQ1iqqHVGGvZ_hHEKisPUdWCLmb2cOvA2YM_qE_oaF1hEiLY4',
		privateKey: '3wr8ipUBivB9q_df-KaZr2JmUX9UdT62FYtb-01TDE8'
	}
});
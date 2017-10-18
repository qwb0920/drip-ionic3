import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserProvider} from '../providers/user/user';
import {Storage} from '@ionic/storage';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = 'welcome';

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                storage: Storage,
                public userProvider: UserProvider) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            if (platform.is('cordova')) {
                (<any>window).plugins.JPush.init();
            }

            setInterval(() => {
                userProvider.getNewMessages().then((data)=>{
                    storage.set('messages',data);
                }).catch((err)=>{

                })
            }, 10000);
        });
    }
}


import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matches: String[];
  isRecording = false;
 
  constructor(
      public navCtrl: NavController
    , public speechRecognition: SpeechRecognition
    , public plt: Platform
    , public cd: ChangeDetectorRef) {}
 
  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      }).catch(e => {
        alert(e);
      });
  }
 
  startListening() 
  {
    this.speechRecognition
        .startListening()
        .subscribe(matches => 
        {
          this.matches = matches;
          console.log(this.matches);
          this.cd.detectChanges();
        });

    this.isRecording = true;
  }

}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Speech from 'speak-tts';
import { Contants } from './../constants';


@Component({
  selector: 'app-image-classifier-webcam-client',
  templateUrl: './image-classifier-webcam-client.component.html',
  styleUrls: ['./image-classifier-webcam-client.component.scss']
})
export class ImageClassifierWebcamClientComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  label: string;
  percentage: number;
  speech: any;
  speech_en: any;
  speech_it: any;
  shouldRead: boolean;

  btnFlag: string;
  langLabel: string;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {

    this.btnFlag = 'uk';
    this.langLabel = 'EN';
    this.speech_en = new Speech();
    this.speech_en.init({
      'lang': 'en-GB'
    });
    this.speech_it = new Speech();
    this.speech_it.init({
      'lang': 'it-IT'
    });
    this.speech = this.speech_en;

    setInterval(async () => {
      this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 300, 300);
      const imageSrc = this.canvas.nativeElement.toDataURL('image/jpeg')
      const imageEncoded = imageSrc.replace('data:image/jpeg;base64,', '');
      this.httpClient.post(Contants.API_ENDPOINT + '/predict',
        {
          image: imageEncoded
        })
        .subscribe(
            response => {
              this.percentage = parseFloat(response['percentage']);
              if ( this.langLabel === 'EN') {
                if (this.label !== response['label_en']) {
                  this.label = response['label_en'];
                  this.checkRead();
                }
              } else {
                if (this.label !== response['label_it']) {
                  this.label = response['label_it'];
                  this.checkRead();
                }
              }

            });
    }, 1000);
  }

  checkRead() {
    if (this.shouldRead) {
      this.speech.speak({
        text: this.label,
      }).catch(e => {
        console.error('An error occurred while reading :', e);
      });
    }
  }

  async ngAfterViewInit() {
    const vid = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          vid.srcObject = stream;

        })
        .catch((err0r) => {
          console.log('Something went wrong!');
        });
    }
  }

  onSpeechChange(event) {
    this.shouldRead = event.checked;
    if (this.shouldRead) {
        this.speech.speak({
          text: this.label,
        }).catch(e => {
          console.error('An error occurred while reading :', e);
        });
    }
  }

  onLangClick() {
    if (this.btnFlag === 'uk') {
      this.btnFlag = 'italy';
      this.langLabel = 'IT';
      this.speech = this.speech_it;
    } else {
      this.btnFlag = 'uk';
      this.langLabel = 'EN';
      this.speech = this.speech_en;
    }
  }

}

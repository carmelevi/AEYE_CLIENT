import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Prediction } from '../prediction';
import { HttpClient } from '@angular/common/http';
import Speech from 'speak-tts';

@Component({
  selector: 'app-image-classfier-upload',
  templateUrl: './image-classfier-upload.component.html',
  styleUrls: ['./image-classfier-upload.component.scss']
})
export class ImageClassfierUploadComponent implements OnInit {
  imageSrc: string;
  @ViewChild('img') imageEl: ElementRef;

  predictions: Prediction[];
  label: string;
  speech: any;
  speech_en: any;
  speech_it: any;
  shouldRead: boolean;

  helloMsg: string;
  model: any;
  loading = true;

  btnFlag: string;
  langLabel: string;


  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.loading = false;
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
  }

  async fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;
        const imageEncoded = this.imageSrc.replace('data:image/jpeg;base64,', '');
          // this.predictions = await this.model.classify(imgEl);
        this.httpClient.post('http://127.0.0.1:9050/predict',
          {
            image: imageEncoded
          })
          .subscribe(
              response => {

                if ( this.langLabel === 'EN') {
                  if (this.label !== response['label_en']) {
                    this.label = response['label_en'];
                  }
                } else {
                  if (this.label !== response['label_it']) {
                    this.label = response['label_it'];
                  }
                }
                if (this.shouldRead) {
                  this.speech.speak({
                    text: this.label,
                  }).catch(e => {
                    console.error('An error occurred while reading :', e);
                  });
                }
              });
      };
    }
  }

  async onClick() {
    this.httpClient.get('http://127.0.0.1:9050/ping')
    .subscribe(
        response => {
          this.helloMsg = response['greeting'];
        });
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

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Prediction } from '../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
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
  shouldRead: boolean;

  helloMsg: string;
  name: string;
  model: any;
  loading = true;


  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    console.log('loading mobilenet model...');
    // this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;
    this.speech = new Speech();
    this.speech.init({
      'lang': 'en-GB'
    });
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
                if (this.label !== response['label']) {
                  this.label = response['label'];
                  if (this.shouldRead) {
                    this.speech.speak({
                      text: this.label,
                    }).catch(e => {
                      console.error('An error occurred while reading :', e);
                    });
                  }
                }
              });
      };
    }
  }

  input(name) {
    this.name = name;
  }

  async onClick() {
    this.httpClient.post('http://127.0.0.1:9050/hello',
    {
        name: this.name
    })
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

}

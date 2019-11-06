import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Prediction } from '../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { HttpClient, HttpParams } from '@angular/common/http';


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

  helloMsg: string;
  name: string;
  model: any;
  loading = true;


  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;
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
                this.label = response['label'];
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

}

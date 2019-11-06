import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    setInterval(async () => {
      this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 300, 300);
      const imageSrc = this.canvas.nativeElement.toDataURL('image/jpeg')
      const imageEncoded = imageSrc.replace('data:image/jpeg;base64,', '');
      this.httpClient.post('http://127.0.0.1:9050/predict',
        {
          image: imageEncoded
        })
        .subscribe(
            response => {
              this.label = response['label'];
              this.percentage = parseFloat(response['percentage']);
            });
    }, 1000);
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

}

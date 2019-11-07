import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-image-classifier-captionbot',
  templateUrl: './image-classifier-captionbot.component.html',
  styleUrls: ['./image-classifier-captionbot.component.scss']
})
export class ImageClassifierCaptionbotComponent implements OnInit {

  imageSrc: string;
  @ViewChild('img') imageEl: ElementRef;
  caption: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  async fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      this.caption = '';

      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;
        const imageEncoded = this.imageSrc.replace('data:image/jpeg;base64,', '');
        this.httpClient.post('http://127.0.0.1:9050/caption_bot',
          {
            image: imageEncoded
          })
          .subscribe(
              response => {
                this.caption = response['caption'];
              });
      };
    }
  }

}

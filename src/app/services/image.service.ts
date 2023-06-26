import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  private imageUrl: string;

  
  constructor(private http: HttpClient) {
    this.imageUrl = 'http://localhost:8080/file';

  }

  upload(file: File): any {
    const formData: FormData = new FormData();

    formData.append('image', file);

    const req = new HttpRequest('POST', `${this.imageUrl}/upload`, formData);

    return this.http.request(req);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Work } from '../works/models/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private worksUrl: string;

  constructor(private http: HttpClient) {
    this.worksUrl = 'http://localhost:8080/trabajos';
  }

  public findAll(): Observable<Work[]> {
    return this.http.get<Work[]>(this.worksUrl+"/listar");
  }

  public findWork(idWork: number): Observable<Work> {
    return this.http.get<Work>(this.worksUrl+"/listar/"+idWork);
  }

  public save(work: Work): Observable<Work> {
    return this.http.post<Work>(this.worksUrl+"/nuevo", work);
  }

  public update(work: Work): Observable<Work>{
    return this.http.put<Work>(this.worksUrl+"/actualizar/"+work.id,work);
  }

  public delete(id: number){
    return this.http.delete<Work>(this.worksUrl+"/eliminar/"+id);
  }
}
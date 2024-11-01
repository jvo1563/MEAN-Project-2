import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Observable } from 'rxjs';
import { UserEntity } from '../models/user-entity';
import { BuisnessEntity } from '../models/buisness-entity';
import { Annotation } from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  //probs should but these url strings in .env
  aws_gw_url:string = 'http://localhost:3000';


  anonymous_post_report_endpoint:string = '/report';

  anonymous_post_buis_endpoint:string = '';

  private_report_endpoint:string = '/report';

  private_category_endpoint:string = '/report-category';

  private_status_endpoint:string = '/report-status';

  private_user_endpoint:string = '/user';

  private_buisness_endpoint:string = '/business-entity';

  private_annotation_endpoint:string = '/annotation';

  //could just post user reports this way too...? Want diff function for that with diff endpoint in gateway???
  createAnonymousReport(new_report:Report): Observable<HttpResponse<Report>>{
    return this.httpClient.post<Report>(this.aws_gw_url + this.anonymous_post_report_endpoint, 
      {
        title: new_report.title,
        description: new_report.description,
        location: new_report.location,
        created_by: new_report.created_by,
        status_id: new_report.status_id,
        category_id:new_report.category_id,
        created_at: new_report.created_at,
        updated_at: new_report.updated_at
      }, 
      {observe:'response'}
    );
  }

  createReport(new_report:Report): Observable<HttpResponse<any>>{
    let response =  this.httpClient.post<any>(this.aws_gw_url + this.anonymous_post_report_endpoint, 
      {
        title: new_report.title,
        description: new_report.description,
        location: new_report.location,
        created_by: new_report.created_by,
        status_id: new_report.status_id,
        category_id:new_report.category_id,
        created_at: new_report.created_at,
        updated_at: new_report.updated_at
      }, 
      {observe:'response'}
    );
    return response;
  }

  getAllReports(): Observable<HttpResponse<any>>{
    // let newHeaders = new HttpHeaders();
    // newHeaders = newHeaders.set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.aws_gw_url+this.private_report_endpoint, {observe: 'response'});
  }

  getReportById( report_id: number): Observable<HttpResponse<any>>{
    return this.httpClient.get<any>(this.aws_gw_url+this.private_report_endpoint+`/${report_id}`, {observe: 'response'});
  }

  updateReport(report_id:number,diff_report:Report): Observable<HttpResponse<any>>{
    
    return this.httpClient.put<any>(this.aws_gw_url + this.private_report_endpoint + `/${report_id}`, 
      {
        title: diff_report.title,
        description: diff_report.description,
        location: diff_report.location,
        status_id: diff_report.status_id,
        assigned_to: diff_report.assigned_to,
        created_at: diff_report.created_at,
        updated_at: diff_report.updated_at
      },
      {observe: 'response'}
    );
  }

  deleteReport(report_id: number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_report_endpoint+`/${report_id}`);
  }

  

  createCategory(new_category: {category_name:string, description:string}): Observable<HttpResponse<{id:number, category_name:string, description:string}>>{
    
    return this.httpClient.post<{id:number, category_name:string, description:string}>(this.aws_gw_url+this.private_category_endpoint, 
      {
        category_name: new_category.category_name,
        desciption: new_category.description
      }, 
      {observe:'response'}
    );
  }

  getAllCategories(): Observable<HttpResponse<{id:number, category_name:string, description:string}[]>>{
    
    return this.httpClient.get<{id:number, category_name:string, description:string}[]>(this.aws_gw_url+this.private_category_endpoint,
      {observe:'response'}
    );
  }

  getCategoryById(cat_id:number): Observable<HttpResponse<{id:number, category_name:string, description:string}>>{
    
    return this.httpClient.get<{id:number, category_name:string, description:string}>(this.aws_gw_url+this.private_category_endpoint + `/${cat_id}`,
      {observe:'response'}
    );
  }

  updateCategory(cat_id:number, diff_category: {id:number, category_name:string, description:string}): Observable<HttpResponse<{id:number, category_name:string, description:string}>>{
    
    return this.httpClient.put<{id:number, category_name:string, description:string}>(this.aws_gw_url+this.private_category_endpoint + `/${cat_id}`,
      {
        id:diff_category.id,
        category_name:diff_category.category_name,
        description: diff_category.description
      },
      {observe:'response'}
    );
  }

  deleteCategory(cat_id:number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_category_endpoint+`/${cat_id}`);
  }




  createStatus(new_status: {status_name:string}): Observable<HttpResponse<{id:number, status_name:string}>>{
    
    return this.httpClient.post<{id:number, status_name:string}>(this.aws_gw_url+this.private_status_endpoint, 
      {
        status_name: new_status.status_name
      }, 
      {observe:'response'}
    );
  }

  getAllStatus(): Observable<HttpResponse<{id:number, status_name:string}[]>>{
    
    return this.httpClient.get<{id:number, status_name:string}[]>(this.aws_gw_url+this.private_status_endpoint,
      {observe:'response'}
    );
  }

  getStatusById(status_id:number): Observable<HttpResponse<{id:number, status_name:string}>>{
    
    return this.httpClient.get<{id:number, status_name:string}>(this.aws_gw_url+this.private_status_endpoint + `/${status_id}`,
      {observe:'response'}
    );
  }

  updateStatus(status_id:number, diff_status: {id:number, status_name:string}): Observable<HttpResponse<{id:number, status_name:string}>>{
    
    return this.httpClient.put<{id:number, status_name:string}>(this.aws_gw_url+this.private_status_endpoint + `/${status_id}`,
      {
        id:diff_status.id,
        status_name:diff_status.status_name
      },
      {observe:'response'}
    );
  }

  deleteStatus(status_id:number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_status_endpoint+`/${status_id}`);
  }



  createUser(new_user: UserEntity): Observable<HttpResponse<UserEntity>>{
    
    return this.httpClient.post<UserEntity>(this.aws_gw_url+this.private_user_endpoint, 
      {
        email:new_user.email,
        first_name:new_user.first_name,
        last_name:new_user.last_name,
        picture: new_user.picture,
        role: new_user.role,
        created_at: new_user.created_at
      }, 
      {observe:'response'}
    );
  }

  getAllUsers(): Observable<HttpResponse<UserEntity[]>>{
    
    return this.httpClient.get<UserEntity[]>(this.aws_gw_url+this.private_user_endpoint,
      {observe:'response'}
    );
  }

  getUserById(user_id:number): Observable<HttpResponse<UserEntity>>{
    
    return this.httpClient.get<UserEntity>(this.aws_gw_url+this.private_user_endpoint + `/${user_id}`,
      {observe:'response'}
    );
  }

  updateUser(user_id:number, diff_user: UserEntity): Observable<HttpResponse<UserEntity>>{
    
    return this.httpClient.put<UserEntity>(this.aws_gw_url+this.private_user_endpoint + `/${user_id}`,
      {
        id: diff_user.id,
        email:diff_user.email,
        first_name:diff_user.first_name,
        last_name:diff_user.last_name,
        picture: diff_user.picture,
        role: diff_user.role,
        created_at: diff_user.created_at
      },
      {observe:'response'}
    );
  }

  deleteUser(user_id:number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_user_endpoint+`/${user_id}`);
  }



  createAnonymousBuisness(new_buisness: BuisnessEntity): Observable<HttpResponse<BuisnessEntity>>{
    
    return this.httpClient.post<BuisnessEntity>(this.aws_gw_url+this.anonymous_post_buis_endpoint+this.anonymous_post_buis_endpoint, 
      {
        report_id:new_buisness.report_id,
        name:new_buisness.name,
        industry: new_buisness.industry,
        address: new_buisness.address,
        email: new_buisness.email,
        phone: new_buisness.phone,
        relation: new_buisness.relation
      }, 
      {observe:'response'}
    );
  }

  createBuisness(new_buisness: BuisnessEntity): Observable<HttpResponse<any>>{
    
    return this.httpClient.post<any>(this.aws_gw_url+this.private_buisness_endpoint, 
      {
        report_id:new_buisness.report_id,
        name:new_buisness.name,
        industry: new_buisness.industry,
        address: new_buisness.address,
        email: new_buisness.email,
        phone: new_buisness.phone,
        relation: new_buisness.relation
      }, 
      {observe:'response'}
    );
  }

  getAllBuisnesss(): Observable<HttpResponse<BuisnessEntity[]>>{
    
    return this.httpClient.get<BuisnessEntity[]>(this.aws_gw_url+this.private_buisness_endpoint,
      {observe:'response'}
    );
  }

  getBuisnessById(buisness_id:number): Observable<HttpResponse<BuisnessEntity>>{
    
    return this.httpClient.get<BuisnessEntity>(this.aws_gw_url+this.private_buisness_endpoint + `/${buisness_id}`,
      {observe:'response'}
    );
  }

  updateBuisness(buisness_id:number, diff_buisness: BuisnessEntity): Observable<HttpResponse<any>>{
    
    return this.httpClient.put<any>(this.aws_gw_url+this.private_buisness_endpoint + `/${buisness_id}`,
      {
        id: diff_buisness.id,
        report_id:diff_buisness.report_id,
        name:diff_buisness.name,
        industry: diff_buisness.industry,
        address: diff_buisness.address,
        email: diff_buisness.email,
        phone: diff_buisness.phone,
        relation: diff_buisness.relation
      },
      {observe:'response'}
    );
  }

  deleteBuisness(buisness_id:number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_buisness_endpoint+`/${buisness_id}`);
  }



  createAnnotation(new_annotation: Annotation): Observable<HttpResponse<Annotation>>{
    
    return this.httpClient.post<Annotation>(this.aws_gw_url+this.private_annotation_endpoint, 
      {
        report_id:new_annotation.report_id,
        title:new_annotation.title,
        created_by: new_annotation.created_by,
        annotation: new_annotation.annotation,
        created_at: new_annotation.created_at
      }, 
      {observe:'response'}
    );
  }

  getAllAnnotations(): Observable<HttpResponse<Annotation[]>>{
    
    return this.httpClient.get<Annotation[]>(this.aws_gw_url+this.private_annotation_endpoint,
      {observe:'response'}
    );
  }

  getAnnotationById(annotation_id:number): Observable<HttpResponse<Annotation>>{
    
    return this.httpClient.get<Annotation>(this.aws_gw_url+this.private_annotation_endpoint + `/${annotation_id}`,
      {observe:'response'}
    );
  }

  updateAnnotation(annotation_id:number, diff_annotation: Annotation): Observable<HttpResponse<Annotation>>{
    console.log(diff_annotation);
    return this.httpClient.put<Annotation>(this.aws_gw_url+this.private_annotation_endpoint + `/${annotation_id}`,
      {
        id: diff_annotation.id,
        report_id:diff_annotation.report_id,
        title:diff_annotation.title,
        created_by: diff_annotation.created_by,
        annotation: diff_annotation.annotation,
        created_at: diff_annotation.created_at
      },
      {observe:'response'}
    );
  }

  deleteAnnotation(annotation_id:number):Observable<void>{
    
    return this.httpClient.delete<void>(this.aws_gw_url+this.private_annotation_endpoint+`/${annotation_id}`);
  }
}

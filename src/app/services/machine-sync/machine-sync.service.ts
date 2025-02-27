import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.module';
import { END_POINTS } from '../../constants/endpoints';
import { map, Observable } from 'rxjs';
import { MachineSync } from '../../layouts/header/machine-sync';

@Injectable({
  providedIn: 'root'
})
export class MachineSyncService {

constructor(private readonly httpClient: HttpClient,
  @Inject(API_URL) private backendUrl: string
) {}

  public getMachineSyncDetails(): Observable<MachineSync> {
    return this.httpClient.get<MachineSync>(this.backendUrl + END_POINTS.machineSync).pipe(map( (res: any) => MachineSync.fromJSON(res.data)));
  }

}

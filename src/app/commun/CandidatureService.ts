import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Candidature } from './InterfaceCandidature';
import { CANDIDATURES } from './dataCandidatures';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private candidaturesSubject = new BehaviorSubject<Candidature[]>(CANDIDATURES);
  candidatures$ = this.candidaturesSubject.asObservable();

  getCandidatures(): Candidature[] {
    return this.candidaturesSubject.value;
  }

  ajouter(candidature: Candidature): void {
    const nouvelles = [...this.candidaturesSubject.value, candidature];
    this.candidaturesSubject.next(nouvelles);
  }

  avezCandidature(formationId: number): boolean {
    return this.candidaturesSubject.value.some(c => c.formationId === formationId);
  }
}

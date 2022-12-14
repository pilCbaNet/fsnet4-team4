/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComunicacionService } from './comunicacion.service';

describe('Service: Comunicacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunicacionService]
    });
  });

  it('should ...', inject([ComunicacionService], (service: ComunicacionService) => {
    expect(service).toBeTruthy();
  }));
});

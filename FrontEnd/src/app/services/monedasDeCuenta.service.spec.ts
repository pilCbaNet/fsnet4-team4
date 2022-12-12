/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonedasDeCuentaService } from './monedasDeCuenta.service';

describe('Service: MonedasDeCuenta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonedasDeCuentaService]
    });
  });

  it('should ...', inject([MonedasDeCuentaService], (service: MonedasDeCuentaService) => {
    expect(service).toBeTruthy();
  }));
});

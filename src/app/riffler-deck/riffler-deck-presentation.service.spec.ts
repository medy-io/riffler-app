import { TestBed } from '@angular/core/testing';

import { RifflerDeckPresentationService } from './riffler-deck-presentation.service';

describe('RifflerDeckPresentationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RifflerDeckPresentationService = TestBed.get(RifflerDeckPresentationService);
    expect(service).toBeTruthy();
  });
});

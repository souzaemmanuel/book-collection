import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should subscribe to valueChanges and emit searchTerm', fakeAsync(() => {
      const emitSpy = jest.spyOn(component.searchTerm, 'emit');

      component.ngOnInit();

      component.form.get('searchInput')?.setValue('test');

      tick(400);
      fixture.detectChanges();
      expect(emitSpy).toHaveBeenCalledWith('test');
    }));

    it('should not emit searchTerm if text is null', () => {
      const formControl = { valueChanges: of(null) }; // Mock formControl valueChanges
      const emitSpy = jest.spyOn(component.searchTerm, 'emit');
      component.form = { get: jest.fn(() => formControl) } as any;

      component.ngOnInit();

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});

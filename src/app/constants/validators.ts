import { AbstractControl } from '@angular/forms';

export function dateLowerThanTodayValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  if (selectedDate < today) {
    return null;
  } else {
    return { dateNotLowerThanToday: true };
  }
}

export function urlValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) {
    return null;
  }

  const urlPattern = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;

  if (urlPattern.test(control.value)) {
    return null;
  } else {
    return { invalidUrl: true };
  }
}

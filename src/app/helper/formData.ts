import { FormGroup } from '@angular/forms';

export class FORM_DATA {
  public getFormData<T extends object | FormGroup | string>(data: T): FormData {
    const formData = new FormData();
    const rawData = data instanceof FormGroup ? data.value : data;

    Object.keys(rawData).forEach((key) => {
      formData.append(key, (rawData as Record<string, unknown>)[key] as string);
    });

    return formData;
  }
}

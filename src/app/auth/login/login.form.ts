import { FormControl, FormGroup } from "@angular/forms";

export type LoginForm = FormGroup<{
    username: FormControl<string>,
    password: FormControl<string>,
    grant_type: FormControl<string>
}>
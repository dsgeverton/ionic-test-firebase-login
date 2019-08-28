import { AbstractControl } from "@angular/forms";

export function ValidateConfirmPassword(control: AbstractControl) {
    if (!control.root.value) {
        return null;
    }

    console.log("passwd value: " + control.root.value.password)
    console.log("confirm passwd value: " + control.root.value.confirmPassword)

    if (control.value === control.root.value.password) {
        return null;
    } else {
        return { validConfirmPassword: true }
    }
}
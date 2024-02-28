import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }).min(5, {
        message: 'El nombre debe ser de al menos 5 caracteres'
    }).max(20, {
        message: 'El nombre no debe exceder los 20 caracteres'
    }).regex(/^[^\W_.*#/-]+$/, {
        message: "El nombre de usuario no puede contener caracteres especiales (_.*#/-)"
    }).regex(/(?:[^\d]*\d){0,3}[^\d]*$/, {
        message: "El nombre de usuario puede tener máximo 3 números"
    }).refine(username => !/^\d+$/.test(username), {
        message: "El nombre de usuario no puede consistir solo de números"
    })
});
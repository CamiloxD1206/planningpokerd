import { z } from 'zod'

export const roomSchema = z.object({
    roomname: z.string({
        required_error: 'Nombre de sala requerido'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres'
    }).max(20, {
        message: 'El nombre no debe exceder los 20 caracteres'
    }).regex(/^[^\W_.*#/-]+$/, {
        message: "El nombre de la sala no puede contener caracteres especiales (_.*#/-)"
    }).regex(/(?:[^\d]*\d){0,3}[^\d]*$/, {
        message: "El nombre de la sala puede tener máximo 3 números"
    }).refine(username => !/^\d+$/.test(username), {
        message: "El nombre de la sala no puede consistir solo de números"
    })
});
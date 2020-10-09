export class Feedback { // mapeando los atributos del formulario
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
};

export const ContactType = ['None', 'Tel', 'Email'];
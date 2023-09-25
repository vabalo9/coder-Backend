import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

// Configura nanoid para generar códigos alfanuméricos de 6 caracteres.
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => nanoid() 
    },
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: Number,
    purchaser: String
});

const ticketsModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketsModel;


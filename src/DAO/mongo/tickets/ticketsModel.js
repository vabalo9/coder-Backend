const userCollection = 'tickets';

const userSchema = new mongoose.Schema({
  code: String,
  datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String
});

const ticketsModel = mongoose.model(ticketsCollection, userSchema);

export default ticketsModel;

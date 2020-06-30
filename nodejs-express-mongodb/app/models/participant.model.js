module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      fio: String,
      fioEng: String,
      rank: String,
      degree: String,
      email: String,
      city: String,
      phone: String,
      country: String,
      job: String,
      note: String,
      participation: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Participant = mongoose.model("Participant", schema);
  return Participant;
};

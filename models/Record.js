const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    format: {
      type: Schema.Types.ObjectId,
      ref: "Format",
      required: [true, "A format must be specified"],
    },
    value: {
      type: Number,
      required: [true, "A value must be provided"],
    },
    code: {
      type: String,
      required: [true, "One or more codes has to be especified"],
    },
    tagValues: [
      {
        fieldName: {
          type: String,
          required: [
            true,
            "A description of the activity has to be especified",
          ],
        },
        type: {
          type: String,
          required: [true, "The field type has to be defined"],
          enum: ["String", "Number", "Date", "Boolean"]
        },
        value: {
            type: Schema.Types.Mixed
        },
        stringValue: String,
        numberValue: Number,
        dateValue: Schema.Types.Date,
        booleanValue: Boolean
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);

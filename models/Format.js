const mongoose = require("mongoose");

const { Schema } = mongoose;

const formatSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A title for the format is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A user must be specified"],
    },
    codes: [
      {
        type: String,
        required: [true, "One or more codes has to be especified"],
      },
    ],
    mainNumericFieldName: {
      type: String,
      required: [true, "The name of the numeric value must be provided"]
    },
    objective: {
        type: Number
    },
    max: {
        type: Number
    },
    min: {
        type: Number
    },
    betterIf: {
        type: String,
        enum: ["Higher", "Lower"]
    },
    tagFields: [
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
        }
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Format", formatSchema);

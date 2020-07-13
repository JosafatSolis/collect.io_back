const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const Format = require("../models/Format");
const { verifyToken } = require("../utils/auth");

// GET ALL THE RECORDS FROM A FORMAT
router.get("/:format_id", verifyToken, function (req, res, next) {
  Record.find()
    .then((found) => res.status(200).json(found))
    .catch((reason) => {
      console.log("Error: ", reason);
      res.status(400).json({ error: reason });
    });
});


//CREATE A RECORD WITH THE FORMAT ID
router.post("/:format", (req, res, next) => {
    const { format } = req.params.format;
    Record.create({ format, ...req.body })
            .then((created) => {
              res.status(200).json({ created });
              console.log(created);
            })
            .catch((reason) => {
              console.log("Error: ", reason);
              res.status(400).json({ error: reason });
            });
  });
  

//CREATE A RECORD WITHOUT THE FORMAT ID
router.post("/", (req, res, next) => {
  // Searches for the code to define the format
  const { code, ...recordFields } = req.body;
  Format.findOne({ codes: code })
    .then((found) => {
      if (found) {
        console.log("Encontrado!!", found);
        const { _id: format } = found;
        Record.create({ code, format, ...recordFields })
          .then((created) => {
            res.status(200).json({ created });
            console.log(created);
          })
          .catch((reason) => {
            console.log("Error: ", reason);
            res.status(400).json({ error: reason });
          });
      } else {
          res.status(400).json({ error: "Code not found!" });
      }
    })
    .catch((reason) => {
      console.log("Error: ", reason);
      res.status(400).json({ error: reason });
    });
});

// // REGRESA TODOS LOS DE UN TENANT_ID
// router.get(
//   "/bytenant/:tenant_id",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { tenant_id } = req.params;
//     Ticket.find({ tenant: tenant_id })
//       .populate("clientUser", "email name lastName")
//       .populate("tecnicianUser", "email name lastName")
//       .then((found) => {
//         if (found) {
//           res.status(200).json(found);
//         } else {
//           res.status(200).json({});
//         }
//       })
//       .catch((reason) => {
//         // O que ocurra un error si el id no viene en el formato correcto.
//         console.log("Error: ", reason);
//         res.status(404).json({ error: reason });
//       });
//   }
// );

// // ++ EN PROCESO ++ REGRESAR TODOS LOS TICKETS ABIERTOS DE UN TENANT
// router.get(
//   "/bytenant/:tenant_id/open",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { tenant_id } = req.params;
//     Ticket.find({ tenant: tenant_id, status: "Open" })
//       .then((found) => {
//         if (found) {
//           res.status(200).json(found);
//         } else {
//           res.status(200).json({});
//         }
//       })
//       .catch((reason) => {
//         // O que ocurra un error si el id no viene en el formato correcto.
//         console.log("Error: ", reason);
//         res.status(404).json({ error: reason });
//       });
//   }
// );

// //ROUTE GET ID
// router.get(
//   "/:id",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { id } = req.params;
//     Ticket.findById(id)
//       .then((found) => {
//         if (found) {
//           res.status(200).json(found);
//         } else {
//           // Pueden darse ambos casos, que no encuentre..
//           console.log("Empty.....");
//           res.status(404).json({});
//         }
//       })
//       .catch((reason) => {
//         // O que ocurra un error si el id no viene en el formato correcto.
//         console.log("Error: ", reason);
//         res.status(404).json({ error: reason });
//       });
//   }
// );

// // ASIGNAR UN TICKET A UN TECNICIAN
// router.patch(
//   "/:id",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { id } = req.params;
//     const { tecnicianUser } = req.body;
//     // Note that new returns the updated version
//     Ticket.findByIdAndUpdate(id, { tecnicianUser }, { new: true })
//       .then((updated) => {
//         if (updated) {
//           res.status(200).json(updated);
//         } else {
//           console.log("Error: Updated fail, not found.");
//           res.status(404).json({});
//         }
//       })
//       .catch((reason) => res.status(400).json({ error: reason }));
//   }
// );

// // AGREGAR UNA ACTIVIDAD A UN TICKET
// router.post(
//   "/:id/newactivity",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { id } = req.params;
//     Ticket.findById(id)
//       .then((ticket) => {
//         if (ticket) {
//           const current = ticket.activities;
//           current.push(req.body);
//           return current;
//         }
//       })
//       .then((updatedActivities) => {
//         if (updatedActivities) {
//           Ticket.findByIdAndUpdate(
//             id,
//             { activities: updatedActivities },
//             { new: true }
//           )
//             .then((updated) => {
//               if (updated) {
//                 res.status(200).json(updated);
//               } else {
//                 console.log("Error: Updated fail, not found.");
//                 res.status(404).json({});
//               }
//             })
//             .catch((reason) => {
//               console.log("Error: ", reason);
//               res.status(400).json({ error: reason });
//           });
//         }
//       })
//       .catch((reason) => {
//         console.log("Error: ", reason);
//         res.status(400).json({ error: reason });
//       });
//   }
// );

// // CAMBIAR EL ESTADO A UN TICKET
// router.patch(
//   "/:id/statusupdate",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     // Note that new returns the updated version
//     Ticket.findByIdAndUpdate(id, { status }, { new: true })
//       .then((updated) => {
//         if (updated) {
//           res.status(200).json(updated);
//         } else {
//           console.log("Error: Updated fail, not found.");
//           res.status(404).json({});
//         }
//       })
//       .catch((reason) => {
//         res.status(400).json({ error: reason });
//         console.log("Error: ", reason);
//       });
//   }
// );

// //ROUTE UPDATE
// router.patch(
//   "/:id",
//   verifyToken,
//   checkRole(["User", "Tecnician", "Admin"]),
//   (req, res, next) => {
//     const { id } = req.params;
//     // Note that new returns the updated version
//     Ticket.findByIdAndUpdate(id, req.body, { new: true })
//       .then((updated) => {
//         if (updated) {
//           res.status(200).json(updated);
//         } else {
//           console.log("Error: Updated fail, not found.");
//           res.status(404).json({});
//         }
//       })
//       .catch((reason) => res.status(400).json({ error: reason }));
//   }
// );

// //ROUTE DELETE
// router.delete("/:id", verifyToken, checkRole(["Admin"]), (req, res, next) => {
//   const { id } = req.params;
//   Ticket.findByIdAndDelete(id)
//     .then((deleted) => res.status(200).json({ deleted }))
//     .catch((reason) => res.status(400).json({ error: reason }));
// });

module.exports = router;

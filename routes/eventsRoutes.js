const express = require("express");

const router = express.Router();

const {
  eventsList,
  eventDetailes,
  eventsCreat,
  eventUpdate,
  eventDelete,
  fullyBooked,
} = require("../controllers/eventsControllers");

router.get("/", eventsList);
router.get("/fully",fullyBooked);
router.get("/:eventId", eventDetailes);

router.post("/", eventsCreat);

router.put("/:eventId", eventUpdate);

router.delete("/:eventId", eventDelete);



module.exports = router;

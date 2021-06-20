const { Event } = require("../db/models");

exports.eventsList = async (req, res) => {
  const startingDate = req.body.startingDate;
  try {
    const allEvents = await Event.findAll({
      attributes: ["id", "name", "image"],
      order: [
        ["startDate", "ASC"],
        ["name", "ASC"],
      ],
    });
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetailes = async (req, res) => {
  try {
    const { eventId } = req.params;

    const foundEvent = await Event.findByPk(eventId);
    res.json(foundEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  const { eventId } = req.params;
};

exports.eventsCreat = async (req, res) => {
  try {
    let newEvent;
    if (req.body.length) {
      newEvent = await Event.bulkCreate(req.body);
    } else {
      const newEvent = await Event.create(req.body);
    }
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByPk(eventId);

    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "event is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message ?? "server error" });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByPk(eventId);

    if (foundEvent) {
      await foundEvent.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message ?? "server error" });
  }
};

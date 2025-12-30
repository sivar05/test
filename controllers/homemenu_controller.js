const Menu = require("../models/homemenu");

/* GET all menu items */
exports.getMenus = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menus" });
  }
};

/* ADD new menu item */
exports.addMenu = async (req, res) => {
  try {
    const newItem = new Menu(req.body); // { name, icon, action }
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

const MenuItem = require('../models/MenuItemModel');

//Create a new menu item (for Admin only)
exports.createMenuItem = async (req,res)=>{
    const {name, category,price,description} = req.body;

    try{
        const newItem = new MenuItem({name, category,price,description});
        await newItem.save();
        res.status(201).json(newItem);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

//get All menu items
exports.getAllMenuItems = async(req,res)=>{
    try{
        const menuItems = await MenuItem.find();
        res.status(201).json(menuItems);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

//update menu item (for Admin only)
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    try {
      const updatedItem = await MenuItem.findByIdAndUpdate(
        id,
        { name, category, price, description },
        { new: true }
      );
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a menu item  (for Admin only)
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedItem = await MenuItem.findByIdAndDelete(id);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  

  




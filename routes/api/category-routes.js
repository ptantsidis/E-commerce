const router = require('express').Router();
const { Category, Product } = require('../../models');
const apiRoutes = require('./api')
// The `/api/categories` endpoint
router.use('./api', apiRoutes)

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{model: Product}]  
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]  
      
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  router.put('/:id', (req, res) => {
//   // update a category by its `id` value
//   try {
//   const categoryData = await Category.findByPk(req.params.id, {
//     req.user.category = req.params.category;
//     res.status(200).json(categoryData)
//   } catch (err) {
//     res.status(400).json(err);
//   }

//   });
// });

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

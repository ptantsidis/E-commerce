// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  // When we delete a Category, make sure to also delete the associated Products.
  onDelete: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id,'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through: { model: ProductTag,
    unique: false
  }
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: { model: ProductTag,
    unique: false
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
 

//a category has many products
// a product belongs to a category
// a product tag belongs to many products
// a tag belongs to many product tags


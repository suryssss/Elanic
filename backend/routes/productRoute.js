const express = require("express");
const { protect,admin} = require("../middleware/authMiddleWare");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", protect,admin, async (req, res) => {
  try {
    const {
      name,
      description,
      discountPrice,
      price,
      stock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      discountPrice,
      price,
      stock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const {
      name,
      description,
      discountPrice,
      price,
      stock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product=await Product.findById(req.params.id)
    if(product){
        product.name=name||product.name
        product.description=description||product.description
        product.discountPrice=discountPrice||product.discountPrice
        product.price=price||product.price
        product.stock=stock||product.stock
        product.category=category||product.category
        product.brand=brand||product.brand
        product.sizes=sizes||product.sizes
        product.colors=colors||product.colors
        product.collections=collections||product.collections
        product.material=material||product.material
        product.gender=gender||product.gender
        product.images=images||product.images
        product.isFeatured=isFeatured !==undefined ? isFeatured : product.isFeatured
        product.isPublished=isPublished !==undefined ? isPublished : product.isPublished
        product.tags=tags || product.tags
        product.dimensions=dimensions || product.dimensions
        product.weight=weight || product.weight
        product.sku=sku || product.sku

        const updateProduct=await product.save();
        res.json(updateProduct);
    }
    else{
      res.status(404).json({message:"Product not found"})
    }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/",async(req,res)=>{
  try{
      const {collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}=req.query

      let query={}

      if (collection && collection.toLocaleLowerCase()!=="all"){
        query.collection=collection;
      }

      if (category && category.toLocaleLowerCase()!="all"){
        query.category=category
      }
      if (material){
        query.material={$in:material.split(",")}
      }
      if (brand){
        query.brand={$in:brand.split(",")}
      }
      if (color){
        query.color={$in:[color]}
      }
      if (size){
        query.size={$in:size.split(",")}
      }
      if (gender){
        query.gender=gender
      }
      if (minPrice || maxPrice){
        query.price={}
        if (minPrice) query.price.gte=Number(minPrice)
        if (maxPrice) query.price.lte=Number(maxPrice)
      }
      if (search){
        query.$or=[
          {name:{$regex:search,$options:"i"}},
          {description:{$regex:search,$options:"i"}}
        ]
      }

      const products=await Product.find(query)
      res.json(products)
  }
  catch{

  }
})


module.exports = router;

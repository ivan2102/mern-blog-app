import Category from "../models/Category.js";
import expressAsyncHandler from "express-async-handler";
import validateMongodbId from "../utils/validateMongodbID.js";

//create category
const createCategory = expressAsyncHandler(async (req, res) => {

    try {

        const category = await Category.create({

            ...req.body,
            user: req.user._id
        })

        res.json(category)
        
    } catch (error) {

        res.json(error)
        
    }
})

//all categories
const allCategories = expressAsyncHandler(async (req, res) => {

    try {

        const  categories = await Category.find({}).populate('user').sort('-createdAt')

        res.json(categories)
        
    } catch (error) {

        res.json(error)
        
    }
})

//single category
const singleCategory = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
    validateMongodbId(id)

    try {

        const category = await Category.findById(id).populate('user').sort('-createdAt')

        res.json(category)
        
    } catch (error) {

        res.json(error)
        
    }

})

//update category
const updateCategory = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
    validateMongodbId(id)

    try {

        const category = await Category.findByIdAndUpdate(id, {

            ...req.body
            

        }, {new: true, runValidators: true})

        res.json(category)
        
    } catch (error) {

        res.json(error)
        
    }
})

//delete category
const deleteCategory = expressAsyncHandler(async (req, res) => {

    const {id} = req.params
    validateMongodbId(id)

    try {

        const category = await Category.findByIdAndDelete(id)

        res.json(category)
        
    } catch (error) {

        res.json(error)
        
    }
})

export {

    createCategory,
    allCategories,
    singleCategory,
    updateCategory,
    deleteCategory
}
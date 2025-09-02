import mongoose from "mongoose";
import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const slug = name.toLowerCase().replace(/ /g, "-");

        if (!name) return res.status(400).json({ error: "Name is required" });

        console.log(req.user);
        const categoryExists = await Category.findOne({ slug });
        if (categoryExists) return res.status(400).json({ error: "Category already exists" });

        const category = await Category.create({ name, slug, createdBy: req.user._id });
        return res.status(200).json({ category, message: "Category created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        const slug = name.toLowerCase().replace(/ /g, "-");

        const existsCategory = await Category.findOne({ _id: { $ne: id }, name });
        if (existsCategory) return res.status(400).json({ error: "Category With this name already exists" });

        const category = await Category.findOneAndUpdate({ _id: id }, { name , slug}, { new: true });

        if (!category) return res.status(404).json({ error: "Category not found" });

        return res.status(200).json({ category, message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;

    try {
        const category = await Category.findOneAndUpdate({ _id: id },{ $set: { isActive: false } });
        if (!category) return res.status(404).json({ error: "Category not found" });
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllCategories = async (_, res) => {
    try {
        const categories = await Category.find({ isActive: true }).select( '_id, name slug' );
        return res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createCategory, updateCategory, deleteCategory , getAllCategories};

import UserModel from "../models/usermodel.js";
import inventoryModel from "../models/inventoryModel.js";
import mongoose from "mongoose";

const createinventoryController = async (req, res) => {
    try {
        const { email, invetoryType } = req.body;
        const inventoryuser = await UserModel.findOne({ email });

        if (!inventoryuser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        if (invetoryType === 'out') {
            const requestBloodGroup = req.body.bloodgroup;
            const requestedQuantityBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            const totalBlood = await inventoryModel.aggregate([
                { $match: { organisation, invetoryType: 'in', bloodgroup: requestBloodGroup } },
                { $group: { _id: '$bloodgroup', total: { $sum: '$quantity' } } }
            ]);

            const totalin = totalBlood[0]?.total || 0;

            const totaloutofBloodGroup = await inventoryModel.aggregate([
                { $match: { organisation, invetoryType: 'out', bloodgroup: requestBloodGroup } },
                { $group: { _id: '$bloodgroup', total: { $sum: '$quantity' } } }
            ]);

            const totalout = totaloutofBloodGroup[0]?.total || 0;
            const available = totalin - totalout;

            if (available < requestedQuantityBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${available}ML of ${requestBloodGroup.toUpperCase()} is available`
                });
            }

            req.body.hospital = inventoryuser._id;
        } else {
            req.body.donar = inventoryuser._id;
        }

        // Set organisation from authenticated user
        req.body.organisation = req.body.userId;

        const inventory = new inventoryModel(req.body);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: 'New blood record added'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in create inventory',
            error: error.message
        });
    }
};

const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
        })
        .populate('donar')
        .populate('hospital')
        .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: 'Get all records successfully',
            inventory
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get inventory',
            error: error.message
        });
    }
};

export { createinventoryController, getInventoryController };
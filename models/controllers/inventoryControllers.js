
import UserModel from "../models/usermodel.js";
import inventoryModel from "../models/inventoryModel.js";
import mongoose from "mongoose";

const createinventoryController = async (req, res) => {
    try {
        const { email} = req.body;
        console.log(email);
        const inventoryuser = await UserModel.findOne({ email });

        if (!inventoryuser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Uncomment and use these blocks as necessary for your role checks
        // if (inventoryType === 'in' && inventoryuser.role !== 'donor') {
        //     return res.status(403).send({
        //         success: false,
        //         message: 'Not a donor account'
        //     });
        // }
        // if (inventoryType === 'out' && inventoryuser.role !== 'hospital') {
        //     return res.status(403).send({
        //         success: false,
        //         message: 'Not a hospital'
        //     });
        // }

        if (req.body.invetoryType === 'out') {
            const requestBloodGroup = req.body.bloodgroup;
            const requestedQuantityBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            const totalBlood = await inventoryModel.aggregate([
                { $match: { organisation, inventoryType: 'in', bloodgroup: requestBloodGroup } },
                { $group: { _id: '$bloodgroup', total: { $sum: '$quantity' } } }
            ]);

            const totalin = totalBlood[0]?.total || 0;

            const totaloutofBloodGroup = await inventoryModel.aggregate([
                { $match: { organisation, inventoryType: 'out', bloodgroup: requestBloodGroup } },
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
        }
        else{
            req.body.donar  =  inventoryuser?._id
        }

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
            error
        });
    }
};

const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({})
            .populate('donar')
            .sort({ hospital: 1 });

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
            error
        });
    }
};

export { createinventoryController, getInventoryController };
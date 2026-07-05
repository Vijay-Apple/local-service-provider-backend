import Address from "../models/addressModel.js";

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            customer: req.user._id,
        }).sort({ isDefault: -1 });

        res.status(200).json({
            success: true,
            data: addresses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const addAddress = async (req, res) => {
    try {
        const {
            label,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            isDefault,
        } = req.body;

        if (isDefault) {
            await Address.updateMany(
                { customer: req.user._id },
                { isDefault: false }
            );
        }

        const address = await Address.create({
            customer: req.user._id,
            label,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            isDefault,
        });

        res.status(201).json({
            success: true,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            customer: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        Object.assign(address, req.body);
        await address.save();

        res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({
            _id: req.params.id,
            customer: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const setDefaultAddress = async (req, res) => {
    try {
        await Address.updateMany(
            { customer: req.user._id },
            { isDefault: false }
        );

        const address = await Address.findOneAndUpdate(
            {
                _id: req.params.id,
                customer: req.user._id,
            },
            {
                isDefault: true,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
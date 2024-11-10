const UserAuthModel = require("../models/UserAuthModel");
const UserPropertiesModel = require("../models/UserPropertiesModel");
const UserFavoritePropertiesModel = require("../models/UserFavoritePropertiesModel");
const httpErrors = require("http-errors");

const addPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var {
        userListingType,
        usrListingName,
        usrListingDescription,
        usrListingSquareFeet,
        location,
        usrAmenities,
        usrExtraFacilities,
        usrPrice,
        userListingImage
    } = req.body;

    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType === "agent") {
            const newPropertySetup = new UserPropertiesModel({
                agentId: userId,
                userListingType,
                usrListingName,
                usrListingDescription,
                usrListingSquareFeet,
                location,
                usrAmenities,
                usrExtraFacilities,
                usrPrice,
                userListingImage,
                usrPropertyTime: new Date(),
                usrPropertyFavorites: 0,
                usrPropertyLiveStatus: true,
                usrPropertySoldTime: null
            });
            var savedUserDetails = await newPropertySetup.save();
            res.status(200).json({
                message: "Property added Success.",
                user_property_details: savedUserDetails
            });
        } else {
            next(httpErrors.Unauthorized("Invalid UserType"))
        }

    } catch (error) {
        next(httpErrors.BadRequest())
    }
}

const showBuyerFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer") {

        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showBuyerTwoFeaturesPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    // Ensure only "buyer" or if user type is not set can access this feature
    if (fetchedUserData.usrType === "buyer" || fetchedUserData.usrType === null) {
        try {
            // Fetch the two properties with the highest price, sorting by usrPrice in descending order
            const topProperties = limit
                ? await UserPropertiesModel.find().sort({ usrPrice: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPrice: -1 });

            console.log("Fetched properties (sorted by price):", topProperties); // Debugging log

            res.status(200).json({
                message: "Top properties fetched successfully.",
                user_property_arr: topProperties
            });
        } catch (error) {
            console.error("Error fetching top properties: ", error);
            next(httpErrors.BadRequest());
        }
    } else {
        res.status(403).json({
            message: "You are not authorized to view this resource."
        });
    }
}

const showAdimFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    if (fetchedUserData.usrType === "admin") {
        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showAgentRecentPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "agent") {
            const agentId = userId;
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Property record fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Your Property record fetched success."));
        }
    } catch (error) {
        next(httpErrors.BadRequest());
    }
};

const showByTypeAgentPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "agent") {
            let query = { agentId: userId };

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching agent properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};

const showByTypeBuyerPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "buyer") {
            let query = {}; // Remove buyerId filter

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching buyer properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};

const showByTypeAdminPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "admin") {
            let query = {}; // Remove adminId filter

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching admin properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};

const editPropertyController = async (req, res, next) => {
    const agentId = req.payload.aud;  // The agent's ID (could also be admin's ID)
    const {
        userId,
        usrListingName,
        usrListingDescription,
        usrListingSquareFeet,
        location,
        usrAmenities,
        usrExtraFacilities,
        usrPrice,
        userListingImage,
        userListingType
    } = req.body;

    try {
        // Fetch user data to determine if they are an agent or admin
        var fetchedUserData = await UserAuthModel.findById(agentId);

        if (fetchedUserData.usrType === "agent" || fetchedUserData.usrType === "admin") {
            // Admin can edit any property, agent can only edit their own
            let property;
            if (fetchedUserData.usrType === "admin") {
                // Admin: Find the property regardless of the agentId
                property = await UserPropertiesModel.findById(userId);
            } else if (fetchedUserData.usrType === "agent") {
                // Agent: Only allow editing properties where the agentId matches
                property = await UserPropertiesModel.findOne({ _id: userId, agentId });
            }

            if (!property) {
                return res.status(404).json({ message: "Property not found." });
            }

            // Update property fields if provided in the request
            property.usrListingName = usrListingName || property.usrListingName;
            property.usrListingDescription = usrListingDescription || property.usrListingDescription;
            property.usrListingSquareFeet = usrListingSquareFeet || property.usrListingSquareFeet;
            property.location = location || property.location;
            property.usrAmenities = usrAmenities || property.usrAmenities;
            property.usrExtraFacilities = usrExtraFacilities || property.usrExtraFacilities;
            property.usrPrice = usrPrice || property.usrPrice;
            property.userListingImage = userListingImage || property.userListingImage;
            property.userListingType = userListingType || property.userListingType;
            
            // Save the updated property
            var savedUserDetails = await property.save();

            res.status(200).json({
                message: "Property updated successfully.",
                property_details: savedUserDetails,
            });
        } else {
            next(httpErrors.Unauthorized("Invalid UserType"));
        }
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "Failed to update property. Please try again." });
    }
};

const showAllUsersFourRecentPropertyController = async (req, res, next) => {
    var { limit } = req.body;
    try {
        const usrPropertiesArr = limit ?
            await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
            : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
        res.status(200).json({
            message: "Property record fetched success.",
            user_property_arr: usrPropertiesArr
        });
    } catch (error) {
        next(httpErrors.BadRequest())
    }
}

const showAllUsersTwoFeaturesPropertyController = async (req, res, next) => {
    var { limit } = req.body;
    try {
        // Fetch the two properties with the highest price, sorting by usrPrice in descending order
        const topProperties = limit
            ? await UserPropertiesModel.find().sort({ usrPrice: -1 }).limit(limit)
            : await UserPropertiesModel.find().sort({ usrPrice: -1 });

        console.log("Fetched properties (sorted by price):", topProperties); // Debugging log

        res.status(200).json({
            message: "Top properties fetched successfully.",
            user_property_arr: topProperties
        });
    } catch (error) {
        console.error("Error fetching top properties: ", error);
        next(httpErrors.BadRequest());
    }
};

const showByTypeAllUserPropertyController = async (req, res, next) => {
    const { type, searchText } = req.body; // Capture both type and searchText
   try {
       let query = {};
       if (type && type !== 'All') {
           query.userListingType = type;
       }
       if (searchText) {
           query = {
               ...query,
               $or: [
                   { usrListingName: { $regex: searchText, $options: 'i' } },
                   { "location.street": { $regex: searchText, $options: 'i' } },
                   { "location.city": { $regex: searchText, $options: 'i' } },
                   { "location.state": { $regex: searchText, $options: 'i' } },
                   { "location.pinCode": { $regex: searchText, $options: 'i' } }
               ]
           };
       }
       const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });
       res.status(200).json({
           message: "Properties fetched successfully based on the type and search.",
           user_property_arr: usrPropertiesArr
       });
   } catch (error) {
       console.error("Error fetching properties:", error);
       next(httpErrors.BadRequest("Failed to fetch properties"));
   }
};

const toggleFavoriteController = async (req, res, next) => {
    const userId = req.payload.aud;  // Assuming JWT payload contains the user ID
    const { propertyId } = req.body;

    try {
        // Fetch user data
        const fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType !== "buyer") {
            return next(httpErrors.Unauthorized("Only buyers can favorite properties"));
        }

        // Check if the property is already favorited
        const favorite = await UserFavoritePropertiesModel.findOne({ buyerId: userId, propertyId });

        if (favorite) {
            // If found, remove it from favorites
            await UserFavoritePropertiesModel.deleteOne({ buyerId: userId, propertyId });
            res.status(200).json({ message: "Property removed from favorites" });
        } else {
            // Otherwise, add it to favorites
            const newFavorite = new UserFavoritePropertiesModel({ buyerId: userId, propertyId });
            await newFavorite.save();
            res.status(200).json({ message: "Property added to favorites" });
        }
    } catch (error) {
        next(httpErrors.InternalServerError("Error toggling favorite property"));
    }
};

const showFavoriteController = async (req, res, next) => {
    const buyerId = req.payload.aud;
    try {
        const fetchedUserData = await UserAuthModel.findById(buyerId);
        if (fetchedUserData.usrType !== "buyer") {
            return next(httpErrors.Unauthorized("Only buyers can view favorite properties"));
        }

        // Find all favorite properties for the buyer
        const favoriteProperties = await UserFavoritePropertiesModel.find({ buyerId });

        // Extract property IDs
        const propertyIds = favoriteProperties.map(favorite => favorite.propertyId);

        // Fetch full property details from UserPropertiesModel
        const favoritedPropertiesDetails = await UserPropertiesModel.find({
            '_id': { $in: propertyIds }
        });

        console.log("Favorited Properties Details:", JSON.stringify(favoritedPropertiesDetails, null, 2));

        res.status(200).json({
            message: "Favorited Property records fetched successfully.",
            user_fav_property_arr: favoritedPropertiesDetails
        });
    } catch (error) {
        console.error("Error fetching favorite properties:", error);
        next(httpErrors.InternalServerError("Error fetching favorite properties"));
    }
};

const showAgentPropertytoOthersController = async (req, res, next) => {
    const agent = req.body;
    // console.log('Received agent:', agent);

    try {
        console.log('AgentId:',agent.agent._id);
        const fetchedUserData = await UserAuthModel.findById(agent.agent._id);
        agentId= agent.agent._id;

        if (fetchedUserData) {
            const usrPropertiesArr = await UserPropertiesModel.find({ agentId: agentId }).sort({ usrPropertyTime: -1 });
            // console.log(usrPropertiesArr)
            res.status(200).json({
                message: "All property records fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("You are not authorized to view these properties."));
        }
    } catch (error) {
        console.error("Error fetching properties: ", error);
        next(httpErrors.BadRequest("Error fetching properties."));
    }
};





module.exports = {
    addPropertyController, showBuyerFourRecentPropertyController, showBuyerTwoFeaturesPropertyController,
    showAdimFourRecentPropertyController, showAgentRecentPropertyController, showByTypeAgentPropertyController,
    showByTypeBuyerPropertyController, showByTypeAdminPropertyController, editPropertyController,
    showAllUsersFourRecentPropertyController, showAllUsersTwoFeaturesPropertyController, showByTypeAllUserPropertyController,
    toggleFavoriteController, showFavoriteController, showAgentPropertytoOthersController
}

// roleController.js

const Roles = require('../models/roles'); 

// const createdRoles = async (req, res) => {
//     try {
//         const rolesArray = req.body.roles; // Extract roles array from request body

//         // Create role instance with roles array
//         const createdRole = await Roles.create({ roles: rolesArray });
 
//         res.status(201).json({
//             id: createdRole.id,
//             roles: rolesArray,
//             created_at: createdRole.created_at,
//             updated_at: createdRole.updated_at,
//         }); // Respond with created roles object
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const createdRoles = async (req, res) => {
    try {
        const role = req.body.roles; // Extract the role string from request body

        // Create role instance with the single role string
        const createdRole = await Roles.create({ roles: role });

        res.status(201).json({ roles: createdRole }); // Respond with created role object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//getall
const getAllRoles = async (req, res) => {
    try {
        const allRoles = await Roles.findAll();

        res.status(200).json(allRoles); // Respond with all roles
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//getrolebyid
const getRoleById = async (req, res) => {
    try {
        const roleId = req.params.id; // Extract role ID from request parameters
        const role = await Roles.findByPk(roleId); // Find role by ID

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//update
const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id; // Extract role ID from request parameters
        const { roles } = req.body; // Extract updated role from request body

        // Update role by ID
        await Roles.update({ roles: roles }, { where: { id: roleId } });
        
        res.status(200).json({ message: `Updating role with ID ${roleId} to ${roles}` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//delete
const deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id; // Extract role ID from request parameters

        // Find the role by ID
        const role = await Roles.findByPk(roleId);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Delete the role
        await role.destroy();

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createdRoles, getAllRoles,updateRole,getRoleById,deleteRole };

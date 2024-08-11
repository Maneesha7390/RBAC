const RBAC = require('./rbacModel');
const {ROLES} = require('../constants')
const checkPermission = (module, key) => {
    return async (req, res, next) => {
        try {
            if(!module) res.status(401).json({ success: false, message: "Permission module not defined" });
            if(!key) res.status(401).json({ success: false, message: "Permission key not defined" });
            const method = req.method.toLowerCase();
            const role = req.user.role;
            const rbac = await RBAC().aggregate([
                { $match: { module, method, role, key } }
            ]);

            if (rbac.length > 0) {
                next();
            } else {
                res.status(403).json({ success: false, message: "Forbidden Access" });
            }
        } catch (error) {
            console.error('Error checking permissions:', error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
};

const createPermission = async(data) => {
        try {
            let finalRole = data.role.includes('all') ? [...ROLES] : data.role
            let framedData = {
                module: data.module,
                method: data.method,
                role: finalRole,
                key: data.key
            }
            const rbac = new RBAC()(framedData);
            await rbac.save();
            return rbac
        } catch (error) {
            console.error('Error creating permissions:', error);
        }
};


const checkExistance = async (data)=>{
    let rbac = await RBAC().findOne({module: data.module, method: data.method, key: data.key}).lean()
    return rbac
}

const updatePermission = async(data) => {
    try {
        let finalRole = data.role.includes('all') ? [...ROLES] : data.role
        let query = {
            module: data.module,
            method: data.method,
            key: data.key
        }
        let setQuery = {...query, role: finalRole}
        let rbac = await RBAC().findOneAndUpdate(
            query,
            { $set: setQuery },
            { new: true, lean: true }
        );
        return rbac
    } catch (error) {
        console.error('Error creating permissions:', error);
    }
};

const deletePermission = async (data)=>{
    await RBAC().deleteOne({module: data.module, method: data.method, key: data.key})
}
module.exports = {
    checkPermission,
    createPermission,
    checkExistance,
    updatePermission,
    deletePermission
};

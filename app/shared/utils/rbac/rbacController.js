const rbacService = require('./rbacService');
const { permissionValidation } = require('./rbacValidator');

const createPermission = async (req, res) => {
    try {          
        let rbacData = req.rbac
        let reqBody = req.body
        let permission
        if(rbacData){
            if(req.query.delete === 'true'){
                await rbacService.deletePermission(reqBody)
                return res.status(200).json({ success: true, message: "permission deleted successfully", permission });
            } 
            if(rbacData.role.length === req.body.role.length && rbacData.role.every((val, index) => val === req.body.role[index])) return res.status(400).json({ success: false, error: "Permission already exists" });
            permission = await rbacService.updatePermission(reqBody)
            return res.status(200).json({ success: true, message: "permission updated successfully", permission });
        }else{
            if(req.query.delete === 'true') return res.status(400).json({ success: false, error: "Permission doesn't exists to delete" });
            permission = await rbacService.createPermission(reqBody)
            return res.status(201).json({ success: true, message: "permission created successfully", permission });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const checkExistance = async (req, res, next) => {
    try {
        let user = req.user
        const reqBody = req.body
        if(!['teamlead', 'developer'].includes(user.role)) return res.status(400).json({ success: false, error: `${user.role} can't perform any oprions on RBAC` });
        const { error } = permissionValidation.validate(reqBody);
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });
        const rbac = await rbacService.checkExistance(reqBody);
        req.rbac = rbac
        next()
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    createPermission,
    checkExistance
}
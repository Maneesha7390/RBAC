exports.createOrganization = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Organization created successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllOrganizations = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Organizations fetched successufully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Organization updated successufully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Organization details fetched successufully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: "Organization deleted successufully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    res.status(201).json({ success: true, message:"Article created successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    res.status(200).json({ success: true, message:"Articles fetched successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
    try {
        res.status(200).json({ success: true, message:"Article details fetched successfully" })
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });

    }
  };
  
  exports.updateArticle = async (req, res) => {
    try {
        res.status(200).json({ success: true, message:"Article updated successfully" })
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });

    }
  };
  
  exports.deleteArticle = async (req, res) => {
    try {
        res.status(200).json({ success: true, message:"Article deleted successfully" })
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };


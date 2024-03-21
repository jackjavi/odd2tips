exports.handleFileUpload = (req, res) => {
  const { title, content, author } = req.body;

  res.send({
    message: "Files uploaded successfully!",
    files: req.files,
    post: { title, content, author },
  });
};

function Comment(content) {
  this._content = content.replace(/^#/, '').trim()
}

module.exports = Comment

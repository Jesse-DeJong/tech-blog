module.exports = {
  commentBelongsToArticle: () => {
    if(id === article.id) { const body = `
    <h6>Author: {{author}} <p><em>{{date_created}}</em></p></h6>
    <p>{{contents}}</p>`;
    return body;
    } 
  } 
};
class ApiFeatures {
  constructor(query, querySTR) {
    this.query = query;
    this.querySTR = querySTR;
  }

  // To search for a product with given keyword.
  search() {
    const keyword = this.querySTR.keyword
      ? {
          name: {
            $regex: this.querySTR.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find(keyword);
    return this;
  }

  // To filter products on the basis of category and price
  filter() {
    const queryCopy = { ...this.querySTR };

    // Remove useless fields from querySTR.
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => {
      delete queryCopy[key];
    });

    let queryStr = JSON.stringify(queryCopy);

    // We need to make our query to be mongoose compatible
    // For this we will use replace method to add $ sign to make gt,lt,lte and gte valid mongoose operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // Since queryStr is a string, we need to parse it as JSON using JSON's parse method
    this.query = this.query.find(JSON.parse(queryStr));

    // Return this object
    return this;
  }

  // For pagination
  // Dividing our product listing to several product pages is called pagination
  pagination(resultPerPage) {
    // current page we are on right now
    const currentPage = Number(this.querySTR.page) || 1;

    // Number of product to skip in order to show correct products
    const skip = resultPerPage * (currentPage - 1);

    // query produts from database based on result per page and number of products to skip
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;

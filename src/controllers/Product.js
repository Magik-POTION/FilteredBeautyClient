/**
 * Represents a product.
 */
export default class Product {
    /**
     *
     * @param {*} product, a product element from a database.
     */
    constructor(product) {
        this.id = product.id;
        this.brand = product.brand;
        this.name = product.name;
        this.image_link = product.image_link;
        this.description = product.description;
        this.category = product.category;
        this.product_type = product.product_type;
        this.tag_list = product.tag_list;
        this.api_featured_image = product.api_featured_image;
        this.product_colors = product.product_colors;

        this.tag_list = this.tag_list.split(",").map((tag) => tag.trim());
    }

    getProperties() {
        return {
            id: this.id,
        };
    }
}
